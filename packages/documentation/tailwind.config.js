/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: {
              background: "#f6f8fa",
              code: {
                background: "#f6f8fa",
              },
            },

            code: {
              background: "rgba(175,184,193,0.2)",
              padding: ".2em .4em",
              borderRadius: "6px",
              fontWeight: "normal",
            },

            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
          },
        },
      },
    },
  },
};
