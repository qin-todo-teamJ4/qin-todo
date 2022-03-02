/* eslint-disable import/no-default-export */
/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    global: true,
    environment: "happy-dom",
  },
});
