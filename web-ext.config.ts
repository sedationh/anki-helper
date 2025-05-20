import { defineWebExtConfig } from "wxt";

export default defineWebExtConfig({
  chromiumArgs: ["--user-data-dir=./.wxt/chrome-data"],
  startUrls: [
    "https://web.neat-reader.orb.local",
    "https://create.t3.gg/en/introduction",
  ],
});
