import { defineConfig } from "vitest/config";
import preact from "@preact/preset-vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.tsx"),
      name: "ChatWidget",
      formats: ["iife"],
      fileName: () => "chatwidget.js",
    },
    cssCodeSplit: false,
    minify: "terser",
    rollupOptions: {
      output: {
        // Inline all CSS into the JS bundle
        assetFileNames: () => "chatwidget.[ext]",
      },
    },
  },
});
