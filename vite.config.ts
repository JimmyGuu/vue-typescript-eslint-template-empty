import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import {
  createStyleImportPlugin,
  NutuiResolve,
} from "vite-plugin-style-import";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    outDir: "build",
    sourcemap: true,
  },
  plugins: [
    vue(),
    createStyleImportPlugin({
      resolves: [NutuiResolve()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          "@import './src/styles/_var.scss';@import './src/styles/_mixins.scss';@import './src/styles/_common.scss';",
      },
    },
  },
  server: {
    port: 9527,
    proxy: {
      "/api": {
        target: "https://api.test.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
