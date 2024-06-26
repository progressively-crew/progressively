const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        title: ["Inter var", ...defaultTheme.fontFamily.sans],
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
      },
      animation: {
        "opacity-appearing": "opacity-appearing 1ms ease-in-out forwards",
        "fade-enter-top": "fade-enter-top 500ms ease-in-out forwards",
        "fade-enter-bottom": "fade-enter-bottom 500ms ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
