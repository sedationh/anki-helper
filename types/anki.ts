export interface AnkiNote {
  highlight: string;
  context: string;
  explanation: string;
  examples: string[];
  pronunciation: string;
  link: string;
}

export interface AnkiHelperSettings {
  deckName: string;
  openrouterApiKey: string;
  openrouterModel: string;
}
