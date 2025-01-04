//@ts-check
import { defineESLintConfig } from "@ntnyq/eslint-config";

export default defineESLintConfig({
  depend: {
    overrides: {
      "depend/ban-dependencies": ["off", { modules: ["execa"] }],
    },
  },
  jsdoc: {
    overrides: {
      "jsdoc/no-types": "off",
    },
  },
  typescript: {
    overrides: {
      "@typescript-eslint/no-use-before-define": "off",
      "import-x/consistent-type-specifier-style": ["error", "prefer-inline"],
      "import-x/no-duplicates": ["error", { "prefer-inline": true }],
      "no-var": "off",
      "vars-on-top": "off",
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
