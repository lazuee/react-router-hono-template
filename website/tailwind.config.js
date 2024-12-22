/** @param {import("tailwindcss").Config} config */
function defineConfig(config) {
  return config;
}

export default defineConfig({
  content: ["./src/client/**/{**,.*}/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  important: true,
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        mono: "var(--font-mono)",
        sans: "var(--font-sans)",
      },
    },
  },
});
