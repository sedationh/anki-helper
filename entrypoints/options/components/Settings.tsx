import React, { useEffect, useState } from "react";
import { ankiSettings, defaultSettings } from "@/storage";
import type { AnkiSettings } from "@/types/anki";
import "./Settings.css";

export function Settings() {
  const [settings, setSettings] = useState<AnkiSettings>(defaultSettings);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const stored = await ankiSettings.getValue();
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
      await ankiSettings.setValue(settings);
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
      <h1 className="settings-title">Anki 设置</h1>
      <form onSubmit={handleSubmit} className="settings-form">
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
        <button type="submit" className="submit-button">
          保存设置
        </button>
        {status && <div className="status-message status-success">{status}</div>}
        {error && <div className="status-message status-error">{error}</div>}
      </form>
    </div>
  );
}
