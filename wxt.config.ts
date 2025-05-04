import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Anki Helper",
    description:
      "A browser extension to help create Anki cards from web content",
    version: "1.0.0",
    permissions: ["clipboardRead", "storage", "contextMenus"],
    icons: {
      "16": "icons/16.png",
      "32": "icons/32.png",
      "48": "icons/48.png",
      "128": "icons/128.png",
    },
  },
  modules: ["@wxt-dev/auto-icons", "@wxt-dev/module-react"],
});
