import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  media: {
    tablet: `(max-width: ${1100 / 16}rem)`,
    mobile: `(max-width: ${550 / 16}rem)`,
  },
  theme: {
    colors: {
      primary: "#c3134e",
      secondary: "hsl(340deg, 82%, 85%)",
      text: "#9ba1a6",
      textAccent: "white",
      background: "#151722",
      backgroundAccent: "rgb(26, 28, 39)",
      border: "rgb(36, 38, 49)",

      focus: "#4D90FE",
      hoverBg: "hsl(340deg, 82%, 85%)",
      hoverFg: "hsl(340deg, 82%, 85%)",
      activeBg: "hsl(340deg, 82%, 85%)",
      activeFg: "hsl(340deg, 82%, 85%)",

      successBg: "#c8e6c9",
      successFg: "#1b5e20",
      successBorder: "#66bb6a",

      errorBg: "#ffcdd2",
      errorFg: "#b71c1c",
      errorBorder: "#ef5350",

      warningBg: "#ffecb3",
      warningFg: "#bf360c",
      warningBorder: "#ffca28",
    },
    sizes: {
      container: "1080px",
      cardHeight: "160px",
      notAuthenticatedCardWidth: "400px",
      cta: "48px",
      emptyStateIconHeight: "160px",
      avatar: "40px",
    },
    fontSizes: {
      xs: "0.8rem",
      big: "3rem",
      content: "1.25rem",
      btn: "1rem",
      title: "3.5rem",

      titleMobile: "2.7rem",
      h2: "2rem",
      h3: "1.6rem",
    },
    fonts: {
      default: "Untitled Sans, apple-system, sans-serif",
    },
    fontWeights: {
      slim: "300",
      normal: "normal",
      semiBold: "500",
      bold: "800",
    },
    lineHeights: {
      content: "1.6",
      title: "2",
    },
    borderRadius: {
      regular: "8px",
    },
    spacing: {
      0: "0px",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
      9: "36px",
      10: "40px",
      11: "44px",
      12: "48px",
      13: "52px",
      14: "56px",
      16: "60px",
    },
  },
});
