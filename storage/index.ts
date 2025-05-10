import { storage } from "#imports";
import { AnkiHelperSettings } from "@/types/anki";

export const defaultSettings: AnkiHelperSettings = {
  deckName: "Default",
  openrouterApiKey: "",
  openrouterModel: "google/gemini-2.0-flash-exp:free",
};

export const defaultSettingsStorage = storage.defineItem<AnkiHelperSettings>(
  "local:ankiSettings",
  {
    fallback: defaultSettings,
    version: 1,
  }
);
