import { AnkiNote } from '../types/anki';

export async function invokeAnkiConnect(action: string, params = {}) {
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

export async function addNote(note: AnkiNote) {
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