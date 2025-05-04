import { storage } from "#imports";
import { AnkiSettings } from "@/types/anki";

export const defaultSettings: AnkiSettings = {
  deckName: "Default",
};

export const ankiSettings = storage.defineItem<AnkiSettings>(
  "local:ankiSettings",
  {
    fallback: defaultSettings,
    version: 1,
  }
);
