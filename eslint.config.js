//@ts-check
import { defineESLintConfig } from "@ntnyq/eslint-config";

export default defineESLintConfig({
  ignores: ["**/README.md/*.ts"],
  importX: {
    typescript: true,
  },
  jsdoc: {
    overrides: {
      "jsdoc/no-types": "off",
    },
  },
  node: {
    overrides: {
      "node/prefer-global/process": "off",
    },
  },
  pnpm: {
    overridesJsonRules: {
      "pnpm/json-enforce-catalog": "off",
      "pnpm/json-prefer-workspace-settings": "off",
    },
  },
  typescript: {
    overrides: {
      "@typescript-eslint/no-use-before-define": "off",
    },
    parserOptions: {
      project: ["apps/*/tsconfig.json", "packages/*/tsconfig.json"],
    },
  },
  yml: {
    overrides: {
      "yml/quotes": ["error", { prefer: "double" }],
    },
  },
});
