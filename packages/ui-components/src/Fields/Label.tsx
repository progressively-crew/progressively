import {
  styled,
  mapTokenToVariant,
  fontSizes,
  fontWeights,
} from "../stitches.config";

export const Label = styled("label", {
  fontFamily: "$default",
  color: "$hadesLight",
  fontSize: "$uranus",
  fontWeight: "$bold",
  display: "block",
  variants: {
    size: mapTokenToVariant("fontSize", fontSizes),
    fontWeight: mapTokenToVariant("fontWeight", fontWeights),
  },
});
