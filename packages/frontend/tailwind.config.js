/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
    },
  },
  plugins: [],
};
