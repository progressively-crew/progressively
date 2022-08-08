import { createStitches } from "@stitches/react";

export const spacing = {
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
  17: "64px",
  18: "68px",
  19: "72px",
  20: "76px",
  21: "80px",
};

export const fontWeights = {
  slim: "300",
  normal: "normal",
  semiBold: "500",
  bold: "800",
};
export const lineHeights = {
  text: "1.6",
  title: "1.2",
};

export const fonts = {
  title: `Catamaran, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`,
  default: `Mulish, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`,
};

export const fontSizes = {
  venus: "3.5rem",
  saturn: "3rem",
  venusMobile: "2.7rem",
  earth: "2rem",
  mars: "1.6rem",
  jupiter: "1.25rem",
  uranus: "1rem",
  neptune: "0.8rem",
};

export const colors = {
  // New colors
  //primaries
  hades: "#0E061F",
  nemesis: "#4B37A9",

  heracles: "white",
  apollo: "#f9f9f9",
  hera: "#eee",
  //secondaries
  nike: "linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(220.78deg, #F8B9CE 9.58%, #9F47A0 36.95%, #430A8B 70.69%, #1E4EC8 107.45%)",
  hermes: "#9ED9D0",
  tyche: "#E0A0C6",
  hypnos: "#430A8B",

  // Old colors
  focus: "#4D90FE",
  activeBg: "hsl(340deg, 82%, 35%)",

  successBg: "#c8e6c9",
  successFg: "#1b5e20",
  successBorder: "#66bb6a",

  errorBg: "#800118",
  errorFg: "#fff",
  errorBorder: "#800118",

  warningBg: "#ffecb3",
  warningFg: "#bf360c",
  warningBorder: "#ffca28",
};

export const mapTokenToVariant = (
  cssAttribute: string,
  partialTheme: any,
  prefix?: string
) => {
  const partialThemeKeys = Object.keys(partialTheme);
  const computedVariant = {};

  for (const key of partialThemeKeys) {
    computedVariant[key] = {
      [cssAttribute]: prefix ? `${prefix}$${key}` : `$${key}`,
    };
  }

  return computedVariant;
};

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
    colors,
    sizes: {
      container: "1080px",
      cardHeight: "160px",
      notAuthenticatedCardWidth: "400px",
      cta: "48px",
      emptyStateIconHeight: "160px",
      avatar: "40px",
    },
    fontSizes,
    fonts,
    fontWeights,
    lineHeights,
    borderRadius: {
      regular: "8px",
    },
    spacing,
  },
});
