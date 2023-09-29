/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jedom",
    setupFiles: ["./src/setupTests.ts"],
  },
  server: {
    host: "0.0.0.0",
  },
  base: "/project2", // Set the base path for the build
});
