import {
  styled,
  mapTokenToVariant,
  fontSizes,
  fontWeights,
} from "~/stitches.config";

export const Label = styled("label", {
  fontFamily: "$default",
  color: "$hades",
  fontSize: "$jupiter",
  fontWeight: "$semiBold",
  display: "block",
  variants: {
    size: mapTokenToVariant("fontSize", fontSizes),
    fontWeight: mapTokenToVariant("fontWeight", fontWeights),
  },
});
