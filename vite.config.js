import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      {
        find: "@public",
        replacement: path.resolve(__dirname, "public"),
      },
      {
        find: "@component",
        replacement: path.resolve(__dirname, "src/component"),
      },
    ],
  },
});
