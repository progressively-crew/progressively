/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
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
      typography: {
        DEFAULT: {
          css: {
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
      },
    },
  },
};
