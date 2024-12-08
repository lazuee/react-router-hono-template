import { env } from "node:process";

import { reactRouterHono } from "@lazuee/react-router-hono";

import { reactRouter } from "@react-router/dev/vite";

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const port = Number.parseInt(env?.PORT || "3000");

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1024,
    copyPublicDir: false,
    minify: "esbuild",
    rollupOptions: {
      output: { minifyInternalExports: true },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  esbuild: {
    format: "esm",
    mangleCache: {},
  },
  plugins: [
    reactRouterHono({
      serverFile: "src/server/index.ts",
    }),
    reactRouter(),
    tsconfigPaths(),
  ],
  server: {
    open: false,
    port,
  },
});
