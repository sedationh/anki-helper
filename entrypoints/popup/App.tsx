import { useState } from "react";
import "./App.css";

interface AnkiNote {
  highlight: string;
  context: string;
  explanation: string;
  examples: string[];
  link: string;
}

async function invokeAnkiConnect(action: string, params = {}) {
  const response = await fetch("http://localhost:8765", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action,
      version: 6,
      params,
    }),
  });
  return response.json();
}

async function addNote(note: AnkiNote) {
  const boldContext = note.context.replace(
    new RegExp(note.highlight, "gi"),
    `<b>$&</b>`
  );

  const ankiNote = {
    deckName: "Default",
    modelName: "问题模板",
    fields: {
      问题: boldContext,
      答案: `${note.explanation}<br>${note.examples
        .map((example) => `- ${example}`)
        .join("<br>")}`,
      相关知识: `<a href="${note.link}">${note.link}</a>`,
    },
    options: {
      allowDuplicate: false,
      duplicateScope: "deck",
    },
  };

  try {
    const result = await invokeAnkiConnect("addNote", { note: ankiNote });
    return { success: true, result };
  } catch (error) {
    console.error(`Error adding note:`, error);
    return { success: false, error };
  }
}

function App() {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

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
                className={`submit-button ${isProcessing ? "processing" : ""}`}
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
