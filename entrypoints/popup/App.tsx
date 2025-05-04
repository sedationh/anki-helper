import { useState, useEffect } from "react";
import { addNote } from "../../services";
import "./App.css";

function App() {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

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
        const { highlight, context, explanation, examples, link } = item;
        if (!highlight || !context || !explanation || !examples || !link) {
          failCount++;
          continue;
        }
        const result = await addNote({
          highlight,
          context,
          explanation,
          examples: Array.isArray(examples) ? examples : [examples],
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

  return (
    <div className="container">
      <div className="app">
        <header className="header">
          <h1 className="title">Anki 助手</h1>
        </header>

        <main className="main">
          <form onSubmit={handleSubmit} className="form">
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="json-input"
              placeholder={`[
  {
    "highlight": "示例词汇",
    "context": "这是一个示例上下文",
    "explanation": "这是解释",
    "examples": ["示例1", "示例2"],
    "link": "https://example.com"
  }
]`}
              required
            />

            <div className="button-container">
              {status && (
                <div
                  className={`status-message ${
                    status.includes("错误")
                      ? "error"
                      : status.includes("成功")
                      ? "success"
                      : "info"
                  }`}
                >
                  {status}
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="submit-button"
              >
                {isProcessing ? "处理中..." : "添加到 Anki"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default App;
