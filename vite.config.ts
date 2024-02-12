import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: "holod-vdom.store",
    proxy: {
      "/api": {
        target: "https://api.holod-vdom.ru",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: "https://api.holod-vdom.ru",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
