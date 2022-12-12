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
