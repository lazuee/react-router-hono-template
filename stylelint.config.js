//@ts-check

/** @param config */
function defineConfig(config) {
  return config;
}

export default defineConfig({
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-tailwindcss/scss",
    "stylelint-config-clean-order",
  ],
  overrides: [
    {
      files: ["*.scss"],
      plugins: ["stylelint-scss"],
    },
  ],
  rules: {
    "no-descending-specificity": null,
    "order/order": [
      {
        name: "apply",
        type: "at-rule",
      },
      "declarations",
      {
        name: "media",
        type: "at-rule",
      },
      {
        selector: "^&::(before|after)",
        type: "rule",
      },
      {
        selector: "^&:\\w",
        type: "rule",
      },
      {
        selector: "^&_",
        type: "rule",
      },
      {
        selector: "^.",
        type: "rule",
      },
    ],
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "layer",
          "import",
          "import-glob",
        ],
      },
    ],
    "selector-class-pattern": null,
  },
});
