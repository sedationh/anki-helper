import { AnkiNote, AnkiHelperSettings } from "@/types/anki";
import { defaultSettingsStorage } from "@/storage";

const SERVER_URL = "http://localhost:8765";
const API_VERSION = 6;

async function getAnkiSettings(): Promise<AnkiHelperSettings> {
  return await defaultSettingsStorage.getValue();
}

export async function invokeAnkiConnect(action: string, params = {}) {
  const response = await fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action,
      version: API_VERSION,
      params,
    }),
  });
  return response.json();
}

export async function addNote(note: AnkiNote) {
  const boldContext = note.context.replace(
    new RegExp(note.highlight, "gi"),
    `<b>$&</b>`
  );

  const settings = await getAnkiSettings();
  const ankiNote = {
    deckName: settings.deckName,
    modelName: "问题模板",
    fields: {
      问题: boldContext,
      答案: `${note.pronunciation}<br>${note.explanation}<br>${note.examples
        .map((example) => `- ${example}`)
        .join("<br>")}`,
      相关知识: note.link ? `<a href="${note.link}">${note.link}</a>` : "",
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