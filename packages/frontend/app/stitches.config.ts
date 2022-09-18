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
  normal: "400",
  semiBold: "600",
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
  mercury: "2.7rem",
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
  hadesLight: "#444",
  nemesis: "#4B37A9",
  nemesisLight: "#eae8fa",

  heracles: "#f4f4f4",
  apollo: "#fff",
  hera: "#fbfbfb",
  //secondaries
  nike: "linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(220.78deg, #F8B9CE 9.58%, #9F47A0 36.95%, #430A8B 70.69%, #1E4EC8 107.45%)",
  hermes: "#9ED9D0",
  tyche: "#B65491",
  hypnos: "#430A8B",

  // Old colors
  focus: "#4D90FE",
  activeBg: "hsl(340deg, 82%, 35%)",

  successBg: "#E0F2F1",
  successFg: "#00695C",
  successBorder: "#B2DFDB",

  errorBg: "#FBE9E7",
  errorFg: "#BF360C",
  errorBorder: "#FFAB91",

  warningBg: "#ffecb3",
  warningFg: "#bf360c",
  warningBorder: "#ffca28",
};

export const sizes = {
  thinContainer: "70ch",
  container: "1260px",
  cta: "48px",
  ctaSmall: "40px",
  emptyStateIconHeight: "160px",
  avatar: "32px",
  treeHeight: "60%",
  dialog: "80ch",
  navHeight: "72px",
  subnavHeight: "52px",
  tableHeight: "500px",
};

export const shadows = {
  regular: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  heavy: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
};

export const mapTokenToVariant = (
  cssAttribute: string,
  partialTheme: any,
  prefix?: string,
  pseudoElement?: string
) => {
  const partialThemeKeys = Object.keys(partialTheme);
  const computedVariant: any = {};

  for (const key of partialThemeKeys) {
    const rule = {
      [cssAttribute]: prefix ? `${prefix}$${key}` : `$${key}`,
    };

    computedVariant[key] = pseudoElement ? { [`&:${pseudoElement}`]: rule } : rule;
  }

  return computedVariant;
};

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } =
  createStitches({
    media: {
      desktop: `(max-width: ${1450 / 16}rem)`,
      tablet: `(max-width: ${1100 / 16}rem)`,
      mobile: `(max-width: ${550 / 16}rem)`,
    },
    theme: {
      colors,
      sizes,
      fontSizes,
      fonts,
      fontWeights,
      lineHeights,
      borderRadius: {
        regular: "8px",
        small: "4px",
      },
      spacing,
      shadows,
    },
  });
