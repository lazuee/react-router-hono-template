//@ts-check

import { createRequire } from "node:module";

const readJSON = (path) => createRequire(import.meta.url)(path);
const packageJson = readJSON("./package.json");

/**
 * @param {import("prettier").Config &
 *   import("@ianvs/prettier-plugin-sort-imports").PluginConfig &
 *   Partial<import("prettier-plugin-jsdoc").JsdocOptions> &
 *   import("prettier-plugin-tailwindcss").PluginOptions} config
 */
function defineConfig(config) {
  return config;
}

export default defineConfig({
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-jsdoc", "prettier-plugin-css-order", "prettier-plugin-tailwindcss"],
  importOrder: [
    "",
    "<TYPES>^(node:)",
    "<BUILTIN_MODULES>",
    "",
    "^(@react-router/)(.*)$",
    "^(react-router)$",
    "",
    "^(react-dom/)(.*)$",
    "^(.*)(react-dom)(.*)$",
    "",
    "^(react)$",
    "^(react)(/.*)$",
    "",
    "^(@hono/)(.*)$",
    "^(hono)$",
    "^(hono/)(.*)$",
    "^(.*)(hono)(.*)$",
    "",
    "^(vite)$",
    "^(vite/)(.*)$",
    "^(vite-plugin)(.*)$",
    "^(vite-)(.*)$",
    "^(.*)(vite)(.*)$",
    "",
    "<TYPES>",
    "<THIRD_PARTY_MODULES>",
    "",
    `<TYPES>^(~/)(.*)$`,
    `^(~/)(.*)$`,
    "<TYPES>^[.]",
    "^[.]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "importAttributes", "decorators"],
  importOrderTypeScriptVersion: packageJson.devDependencies.typescript.replace(/[^0-9.]+/, ""),
  jsdocCommentLineStrategy: "singleLine",
  tsdoc: true,
  cssDeclarationSorterOrder: "smacss",
  tailwindFunctions: ["cn"],
  tailwindAttributes: ["class", ".*[cC]lassName"],
  overrides: [
    {
      files: "{**/.vscode/*.json,**/tsconfig.json}",
      options: {
        parser: "json5",
        quoteProps: "preserve",
        singleQuote: false,
        trailingComma: "all",
      },
    },
    {
      files: "*.css",
      options: {
        singleQuote: false,
      },
    },
    {
      files: ["**/*.mdx"],
      options: {
        proseWrap: "preserve",
        htmlWhitespaceSensitivity: "ignore",
      },
    },
  ],
  jsxSingleQuote: false,
  bracketSpacing: true,
  bracketSameLine: true,
  useTabs: false,
  semi: true,
  tabWidth: 2,
  printWidth: 160,
  endOfLine: "crlf",
});
