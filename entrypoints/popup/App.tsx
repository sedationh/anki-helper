import { useState, useEffect } from "react";
import { addNote, streamToOpenRouter } from "@/services";
import { browser } from "wxt/browser";
import "./App.css";

function App() {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [streamedText, setStreamedText] = useState<string>("");

  useEffect(() => {
    const getClipboardData = async () => {
      // 首先尝试使用 execCommand
      const textarea = document.createElement("textarea");
      document.body.appendChild(textarea);
      textarea.focus();
      const successful = document.execCommand("paste");
      const text = textarea.value;
      document.body.removeChild(textarea);

      if (successful && text) {
        try {
          JSON.parse(text);
          setJsonInput(text);
        } catch (error) {
          setStatus("剪贴板内容不是有效的 JSON 格式，请检查格式");
        }
        return;
      }

      // 如果 execCommand 失败，尝试使用 Clipboard API
      try {
        const clipboardText = await navigator.clipboard.readText();
        if (clipboardText) {
          try {
            JSON.parse(clipboardText);
            setJsonInput(clipboardText);
          } catch (error) {
            setStatus("剪贴板内容不是有效的 JSON 格式，请检查格式");
          }
        }
      } catch (error) {
        console.error("Failed to read clipboard:", error);
        setStatus(
          "无法读取剪贴板数据，请点击输入框并按 Ctrl+V / Command+V 粘贴"
        );
      }
    };

    getClipboardData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const data = JSON.parse(jsonInput);
      if (!Array.isArray(data)) {
        setStatus("输入必须是卡片数据数组");
        return;
      }

      setStatus("添加中...");
      let successCount = 0;
      let failCount = 0;

      for (const item of data) {
        const {
          highlight,
          context,
          explanation,
          examples,
          _link,
          pronunciation,
        } = item;
        // 如果 link 为空，则用当前 active tab url 代替
        let link = _link;
        if (!link) {
          try {
            // Using browser.tabs API which is compatible with both Chrome and Firefox
            const [activeTab] = await browser.tabs.query({
              active: true,
              currentWindow: true,
            });
            link = activeTab.url || "";
          } catch (error) {
            console.error("Failed to get active tab URL:", error);
            link = "";
          }
        }

        if (
          !highlight ||
          !context ||
          !explanation ||
          !examples ||
          !link ||
          !pronunciation
        ) {
          failCount++;
          continue;
        }
        const result = await addNote({
          highlight,
          context,
          explanation,
          examples: Array.isArray(examples) ? examples : [examples],
          pronunciation,
          link,
        });
        if (result.success) {
          successCount++;
        } else {
          failCount++;
        }
      }

      setStatus(`添加完成：成功 ${successCount} 张，失败 ${failCount} 张`);
      if (successCount > 0) {
        setJsonInput("");
      }
    } catch (error) {
      setStatus("JSON 格式错误，请检查输入");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateFromHighlights = async () => {
    setIsProcessing(true);
    setStatus("获取高亮文本中...");
    setStreamedText("");

    try {
      // 获取当前活跃标签页
      const [activeTab] = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!activeTab?.id) {
        setStatus("无法获取当前标签页");
        setIsProcessing(false);
        return;
      }

      // 向内容脚本发送消息请求高亮文本和生成的prompt
      const data = await browser.tabs
        .sendMessage(activeTab.id, {
          action: "getHighlights",
        })
        .catch(() => {
          return {
            success: false,
            error: "获取高亮文本失败，请确认页面已加载完成",
          };
        });

      if (!data || !data.success) {
        setStatus(data?.error || "获取高亮文本失败，请确认页面已加载完成");
        setIsProcessing(false);
        return;
      }

      // 直接使用从内容脚本获取的prompt
      const { prompt } = data;

      // 使用流式API发送到AI服务获取JSON
      setStatus("AI生成中...");
      
      // 创建消息对象
      const messages = [
        { 
          role: "user" as const, 
          content: [{ type: "text" as const, text: prompt }],
        },
      ];
      
      // 使用流式API
      const stream = await streamToOpenRouter(messages);
      
      // 创建临时变量保存完整响应
      let fullResponse = "";
      
      // 获取流的文本流
      const textStream = stream.textStream;
      
      // 处理流式响应
      for await (const chunk of textStream) {
        fullResponse += chunk;
        setStreamedText(fullResponse);
      }
      
      // 流式响应结束后，尝试解析JSON
      const jsonMatch = fullResponse.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (jsonMatch) {
        const jsonText = jsonMatch[0];
        // 验证是否是有效JSON
        JSON.parse(jsonText);
        setJsonInput(jsonText);
        setStreamedText("");
        setStatus("AI生成成功");
      } else {
        setStatus("AI返回的结果不包含有效JSON");
      }
    } catch (error) {
      console.error("Error generating from highlights:", error);
      setStatus("生成过程中出错，请检查API配置或重试");
      setStreamedText("");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container">
      <div className="app">
        <header className="header">
          <h1 className="title">Anki 助手</h1>
        </header>

        <main className="main">
          <form onSubmit={handleSubmit} className="form">
            <textarea
              value={streamedText || jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="json-input"
              placeholder={`[
  {
    "highlight": "示例词汇",
    "context": "这是一个示例上下文",
    "explanation": "这是解释",
    "examples": ["示例1", "示例2"],
    "pronunciation": "美 /ˌpɪktʃə'resk/",
    "link": "https://example.com"
  }
]`}
              required
            />

            <div className="button-container">
              {status && (
                <div
                  className={`status-message ${
                    status.includes("错误") || status.includes("失败")
                      ? "error"
                      : status.includes("成功")
                      ? "success"
                      : "info"
                  }`}
                >
                  {status}
                </div>
              )}

              <div className="buttons">
                <button
                  type="button"
                  onClick={handleGenerateFromHighlights}
                  disabled={isProcessing}
                  className="ai-button"
                >
                  {isProcessing ? "生成中..." : "从高亮文本生成"}
                </button>

                <button
                  type="submit"
                  disabled={isProcessing || streamedText !== ""}
                  className="submit-button"
                >
                  {isProcessing ? "处理中..." : "添加到 Anki"}
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default App;
