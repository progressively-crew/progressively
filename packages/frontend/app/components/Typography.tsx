import {
  styled,
  fontSizes,
  mapTokenToVariant,
  fonts,
  lineHeights,
  fontWeights,
  colors,
} from "~/stitches.config";

export const Typography = styled("p", {
  color: "$text",
  fontSize: "$jupiter",
  fontFamily: "$default",
  lineHeight: "$text",
  maxWidth: "60ch",

  "& strong": {
    fontWeight: "bold",
    color: "$textAccent",
  },

  variants: {
    fontWeight: mapTokenToVariant("fontWeight", fontWeights),
    lineHeight: mapTokenToVariant("lineHeight", lineHeights),
    font: mapTokenToVariant("fontFamily", fonts),
    size: mapTokenToVariant("fontSize", fontSizes),
    color: mapTokenToVariant("color", colors),
  },
});
