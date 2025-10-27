import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "./vite.config.js",
    test: {
      include: ["**/__tests__/**/*.test.{js,jsx,ts,tsx}"],
      name: "happy-dom",
      environment: "happy-dom",
      coverage: ["text", "json", "html"],
    },
  },
  {
    extends: "./vite.config.js",
    test: {
      setupFiles: ["vitest-browser-react"],
      include: ["**/__tests__/**/*.test.{js,jsx,ts,tsx}"],
      name: "browser",
      browser: {
        provider: "playwright",
        enabled: true,
        name: "chromium",
      },
    },
  },
]);
