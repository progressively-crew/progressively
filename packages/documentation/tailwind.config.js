// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "fade-enter-top": {
          "0%": { transform: "translateY(-1rem)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "fade-enter-bottom": {
          "0%": { transform: "translateY(1rem)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "fade-enter-left": {
          "0%": { transform: "translateX(1rem)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
      animation: {
        "fade-enter-top": "fade-enter-top 500ms ease-in-out forwards",
        "fade-enter-bottom": "fade-enter-bottom 500ms ease-in-out forwards",
        "fade-enter-left": "fade-enter-left 500ms ease-in-out forwards",
      },
      typography(theme) {
        return {
          DEFAULT: {
            css: {
              a: {
                color: theme("colors.indigo.700"),
              },
              pre: {
                whiteSpace: "no-wrap",
                background: "#fff",
                border: "1px solid #eee",
                code: {
                  width: "100%",
                  background: "#fff",
                },
              },

              code: {
                background: "rgba(175,184,193,0.2)",
                padding: ".2em .4em",
                borderRadius: "6px",
                fontWeight: "normal",
              },

              "code::before": {
                content: "unset",
              },
              "code::after": {
                content: "unset",
              },
              "blockquote p::before": {
                content: "unset",
              },
              "blockquote p::after": {
                content: "unset",
              },
            },
          },
          dark: {
            css: {
              color: theme("colors.gray.300"),
              '[class~="lead"]': { color: theme("colors.gray.400") },
              a: { color: theme("colors.indigo.400") },
              strong: { color: theme("colors.gray.100") },
              "ul > li::before": { backgroundColor: theme("colors.gray.700") },
              hr: { borderColor: theme("colors.gray.800") },
              blockquote: {
                color: theme("colors.gray.100"),
                borderLeftColor: theme("colors.gray.800"),
              },
              h1: { color: theme("colors.gray.100") },
              h2: { color: theme("colors.gray.100") },
              h3: { color: theme("colors.gray.100") },
              h4: { color: theme("colors.gray.100") },
              code: { color: theme("colors.gray.100") },
              "a code": { color: theme("colors.gray.100") },
            },
          },
        };
      },
    },
  },

  variants: {
    extend: { typography: ["dark"] },
  },
};
