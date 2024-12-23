//@ts-check

/**
 * @param {Omit<import("stylelint").Config, "rules"> &
 * { rules?: Partial<import("stylelint-config-clean-order")["rules"]> } &
 * { rules?: Partial<import("stylelint-config-tailwindcss")["rules"]> } &
 * { rules?: Partial<{ [K in keyof typeof import("stylelint")["default"]["rules"] as `${string & K}`]: any }>}} config
 */
function defineConfig(config) {
  return config;
}

export default defineConfig({
  extends: ["stylelint-config-tailwindcss", "stylelint-config-clean-order"],
  rules: {
    "no-descending-specificity": null,
    "selector-class-pattern": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "import",
          "config",
          "theme",
          "utility",
          "plugin",
          "apply",
          "variant",
          "screen",
          "source",
        ],
      },
    ],
  },
});
