const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "opacity-appearing": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-enter-top": {
          "0%": { transform: "translateY(-1rem)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "fade-enter-bottom": {
          "0%": { transform: "translateY(1rem)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "fade-enter-left": {
          "0%": { transform: "translateX(-1rem)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "fade-enter-right": {
          "0%": { transform: "translateX(1rem)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
      animation: {
        "opacity-appearing": "opacity-appearing 300ms ease-in-out forwards",
        "fade-enter-top": "fade-enter-top 500ms ease-in-out forwards",
        "fade-enter-bottom": "fade-enter-bottom 500ms ease-in-out forwards",
        "fade-enter-left": "fade-enter-left 500ms ease-in-out forwards",
        "fade-enter-right": "fade-enter-right 500ms ease-in-out forwards",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
};
