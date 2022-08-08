import {
  styled,
  fontSizes,
  mapTokenToVariant,
  fonts,
  lineHeights,
  fontWeights,
  colors,
} from "~/stitches.config";

export const Typography = styled<any, any>("p", {
  color: "$hades",
  fontSize: "$jupiter",
  fontFamily: "$default",
  lineHeight: "$text",
  maxWidth: "60ch",

  "& strong": {
    fontWeight: "bold",
  },

  variants: {
    fontWeight: mapTokenToVariant("fontWeight", fontWeights),
    lineHeight: mapTokenToVariant("lineHeight", lineHeights),
    font: mapTokenToVariant("fontFamily", fonts),
    size: mapTokenToVariant("fontSize", fontSizes),
    color: mapTokenToVariant("color", colors),
  },
});
