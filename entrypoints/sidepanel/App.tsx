import { AnkiNote } from "@/types/anki";
import React, { useState, useEffect, useRef } from "react";

const AutoHeightTextArea: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}> = ({ value, onChange, placeholder, className }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      rows={1}
    />
  );
};

export default function App() {
  const [cards, setCards] = useState<AnkiNote[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleImport = async () => {
    let dataToImport = inputValue;

    // If input is empty, try to get from clipboard
    if (!dataToImport.trim()) {
      try {
        dataToImport = await navigator.clipboard.readText();
      } catch (err) {
        setError("无法读取剪贴板");
        return;
      }
    }

    try {
      const data = JSON.parse(dataToImport);
      if (Array.isArray(data)) {
        setCards(data);
        setError(null);
        setInputValue("");
      } else {
        setError("输入必须是一个数组");
      }
    } catch (err) {
      setError("JSON 格式错误");
    }
  };

  const handleRemoveCard = (index: number) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  };

  const handleCardEdit = (index: number, field: keyof AnkiNote, value: any) => {
    const newCards = [...cards];
    newCards[index] = {
      ...newCards[index],
      [field]: value,
    };
    setCards(newCards);
  };

  const handleExampleEdit = (
    cardIndex: number,
    exampleIndex: number,
    value: string
  ) => {
    const newCards = [...cards];
    newCards[cardIndex].examples[exampleIndex] = value;
    setCards(newCards);
  };

  const handleAddExample = (cardIndex: number) => {
    const newCards = [...cards];
    newCards[cardIndex].examples.push("");
    setCards(newCards);
  };

  const handleRemoveExample = (cardIndex: number, exampleIndex: number) => {
    const newCards = [...cards];
    newCards[cardIndex].examples.splice(exampleIndex, 1);
    setCards(newCards);
  };

  const handleExport = () => {
    const json = JSON.stringify(cards, null, 2);
    navigator.clipboard.writeText(json).then(() => {
      alert("已复制到剪贴板");
    });
  };

  const scrollToCard = (index: number) => {
    const element = document.getElementById(`card-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <div className="toc-header">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="action-btn export-btn"
          >
            回到顶部
          </button>
          <button onClick={handleExport} className="action-btn export-btn">
            导出
          </button>
        </div>
        <div className={`toc expanded`}>
          {cards.map((card, index) => (
            <div
              key={index}
              className="toc-item"
              onClick={() => scrollToCard(index)}
            >
              {card.highlight}
            </div>
          ))}
        </div>
      </div>

      <div className="actions">
        <div className="import-section">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="粘贴卡片数据 (JSON 格式)，如果为空则自动从剪贴板导入"
            className="import-textarea"
          />
          <button onClick={handleImport} className="action-btn import-btn">
            导入
          </button>
          {error && <div className="error">{error}</div>}
        </div>
      </div>

      <div className="card-list">
        {cards.map((card, index) => (
          <div key={index} id={`card-${index}`} className="card">
            <div className="card-header">
              <input
                type="text"
                value={card.highlight}
                onChange={(e) =>
                  handleCardEdit(index, "highlight", e.target.value)
                }
                placeholder="单词/短语"
                className="highlight-input"
              />
              <button
                className="remove-btn"
                onClick={() => handleRemoveCard(index)}
              >
                ×
              </button>
            </div>

            <div className="card-content">
              <div className="field">
                <label>上下文:</label>
                <AutoHeightTextArea
                  value={card.context}
                  onChange={(e) =>
                    handleCardEdit(index, "context", e.target.value)
                  }
                  placeholder="单词/短语出现的原始上下文"
                  className="auto-height-textarea"
                />
              </div>

              <div className="field">
                <label>解释:</label>
                <AutoHeightTextArea
                  value={card.explanation}
                  onChange={(e) =>
                    handleCardEdit(index, "explanation", e.target.value)
                  }
                  placeholder="定义或解释"
                  className="auto-height-textarea"
                />
              </div>

              <div className="field">
                <label>例句:</label>
                {card.examples.map((example, exampleIndex) => (
                  <div key={exampleIndex} className="example-row">
                    <AutoHeightTextArea
                      value={example}
                      onChange={(e) =>
                        handleExampleEdit(index, exampleIndex, e.target.value)
                      }
                      placeholder={`例句 ${exampleIndex + 1}`}
                      className="auto-height-textarea"
                    />
                    {card.examples.length > 1 && (
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveExample(index, exampleIndex)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="add-btn"
                  onClick={() => handleAddExample(index)}
                >
                  + 添加例句
                </button>
              </div>

              <div className="field">
                <label>发音:</label>
                <input
                  type="text"
                  value={card.pronunciation}
                  onChange={(e) =>
                    handleCardEdit(index, "pronunciation", e.target.value)
                  }
                  placeholder="音标"
                />
              </div>

              <div className="field">
                <label>链接:</label>
                <input
                  type="text"
                  value={card.link || ""}
                  onChange={(e) =>
                    handleCardEdit(index, "link", e.target.value || null)
                  }
                  placeholder="参考链接（可选）"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
