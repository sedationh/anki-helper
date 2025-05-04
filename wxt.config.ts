import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ["clipboardRead", "storage"],
  },
  modules: ["@wxt-dev/module-react"],
});
