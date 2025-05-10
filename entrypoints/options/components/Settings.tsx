import React, { useEffect, useState } from "react";
import { defaultSettingsStorage, defaultSettings } from "@/storage";
import type { AnkiHelperSettings } from "@/types/anki";
import "./Settings.css";

export function Settings() {
  const [settings, setSettings] = useState<AnkiHelperSettings>(defaultSettings);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const stored = await defaultSettingsStorage.getValue();
      if (stored) {
        setSettings(stored);
      }
    } catch (err) {
      setError("Failed to load settings");
      console.error("Failed to load settings:", err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await defaultSettingsStorage.setValue(settings);
      setStatus("设置已保存！");
      setError("");
      setTimeout(() => setStatus(""), 2000);
    } catch (err) {
      setError("Failed to save settings");
      console.error("Failed to save settings:", err);
    }
  }

  return (
    <div className="settings-container">
      <h1 className="settings-title">设置</h1>
      <form onSubmit={handleSubmit} className="settings-form">
        <h2 className="settings-section-title">Anki 设置</h2>
        <div className="form-group">
          <label className="form-label">牌组名称</label>
          <input
            type="text"
            value={settings.deckName}
            onChange={(e) =>
              setSettings({ ...settings, deckName: e.target.value })
            }
            className="form-input"
          />
        </div>
        
        <h2 className="settings-section-title">OpenRouter 设置</h2>
        <div className="form-group">
          <label className="form-label">API 密钥</label>
          <input
            type="password"
            value={settings.openrouterApiKey}
            onChange={(e) =>
              setSettings({ ...settings, openrouterApiKey: e.target.value })
            }
            className="form-input"
            placeholder="sk-or-..."
          />
          <div className="form-hint">
            从 <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer">OpenRouter</a> 获取 API 密钥
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">模型</label>
          <input
            type="text"
            value={settings.openrouterModel}
            onChange={(e) =>
              setSettings({ ...settings, openrouterModel: e.target.value })
            }
            className="form-input"
            placeholder="google/gemini-2.0-flash-exp:free"
          />
          <div className="form-hint">
            推荐使用支持多模态的模型，如 Gemini 系列
          </div>
        </div>
        
        <button type="submit" className="submit-button">
          保存设置
        </button>
        {status && <div className="status-message status-success">{status}</div>}
        {error && <div className="status-message status-error">{error}</div>}
      </form>
    </div>
  );
}
