//@ts-check

/**
 * @param {Omit<import("stylelint").Config, "rules"> &
 * { rules?: Partial<import("stylelint-config-clean-order")["rules"]> } &
 * { rules?: Partial<import("stylelint-config-standard-scss")["rules"]> } &
 * { rules?: Partial<import("stylelint-config-tailwindcss")["rules"]> } &
 * { rules?: Partial<{ [K in keyof typeof import("stylelint")["default"]["rules"] as `${string & K}`]: any }>} &
 * { rules?: Partial<{ [K in keyof typeof import("./node_modules/stylelint-scss/src/rules") as `scss/${string & K}`]: any }>}} config
 */
function defineConfig(config) {
  return config;
}

export default defineConfig({
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-tailwindcss",
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
    "selector-class-pattern": null,
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
  },
});
