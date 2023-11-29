/// <reference types="vitest" />

import { defineConfig } from "vite";

export default defineConfig({
  test: {
    coverage: {
      reporter: ["text", "html"],
      exclude: [
        "**/src/components/newsletterBox/NewsLetterBox.tsx",
        "**/src/services/utilities/mailHandler.ts",
      ],
    },
  },
});
