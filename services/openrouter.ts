import { generateText, streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { defaultSettingsStorage } from "@/storage";

export interface OpenRouterMessage {
  role: "user" | "assistant" | "system";
  content: Array<
    | { type: "text"; text: string }
    | { type: "image_url"; image_url: { url: string } }
  >;
}

export interface OpenRouterOptions {
  model?: string;
  apiKey?: string;
}

/**
 * 使用 OpenRouter 官方 provider 发送请求到 OpenRouter API
 */
export async function sendToOpenRouter(
  messages: OpenRouterMessage[],
  options: OpenRouterOptions = {}
) {
  const settings = await defaultSettingsStorage.getValue();
  const apiKey = options.apiKey || settings.openrouterApiKey;
  const model = options.model || settings.openrouterModel || "google/gemini-2.0-flash-exp:free";

  if (!apiKey) {
    throw new Error("OpenRouter API key is required");
  }

  try {
    // 创建 OpenRouter provider 实例
    const openrouter = createOpenRouter({
      apiKey,
    });

    // 转换消息格式
    const formattedMessages = messages.map((msg) => {
      // 对于纯文本消息
      const textContent = msg.content.find((c) => c.type === "text");
      if (textContent && "text" in textContent) {
        return {
          role: msg.role,
          content: textContent.text,
        };
      }

      // 对于包含图像的消息，保持多模态格式
      return {
        role: msg.role,
        content: msg.content,
      };
    });

    // 非流式请求 - 一次性获取完整响应
    const { text } = await generateText({
      model: openrouter.chat(model),
      messages: formattedMessages as any,
    });

    return {
      success: true,
      result: text,
    };
  } catch (error) {
    console.error(`Error sending to OpenRouter:`, error);
    return { success: false, error };
  }
}

/**
 * 使用 OpenRouter 官方 provider 发送流式请求到 OpenRouter API
 */
export async function streamToOpenRouter(
  messages: OpenRouterMessage[],
  options: OpenRouterOptions = {}
) {
  const settings = await defaultSettingsStorage.getValue();
  const apiKey = options.apiKey || settings.openrouterApiKey;
  const model = options.model || settings.openrouterModel || "google/gemini-2.0-flash-exp:free";

  if (!apiKey) {
    throw new Error("OpenRouter API key is required");
  }

  try {
    // 创建 OpenRouter provider 实例
    const openrouter = createOpenRouter({
      apiKey,
    });

    // 转换消息格式
    const formattedMessages = messages.map((msg) => {
      // 对于纯文本消息
      const textContent = msg.content.find((c) => c.type === "text");
      if (textContent && "text" in textContent) {
        return {
          role: msg.role,
          content: textContent.text,
        };
      }

      // 对于包含图像的消息，保持多模态格式
      return {
        role: msg.role,
        content: msg.content,
      };
    });

    // 流式请求 - 返回流式响应对象
    const result = streamText({
      model: openrouter.chat(model),
      messages: formattedMessages as any,
    });

    return result;
  } catch (error) {
    console.error(`Error streaming from OpenRouter:`, error);
    throw error;
  }
}
