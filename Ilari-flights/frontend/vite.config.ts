/// <reference types="vitest" />
import { defineConfig } from "vite";
import type { UserConfig as VitestUserConfigInterface } from "vitest/config";
import react from "@vitejs/plugin-react";

const vitestConfig: VitestUserConfigInterface = {
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: "./testSetup.js",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: vitestConfig.test,
});
