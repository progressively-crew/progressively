import { styled, mapTokenToVariant, colors } from "~/stitches.config";

export const Tag = styled("span", {
  borderRadius: "$borderRadius$regular",
  padding: "$spacing$1 $spacing$2",
  color: "$apollo",
  background: "$hades",
  fontSize: "$uranus",

  variants: {
    color: mapTokenToVariant("color", colors),
    background: mapTokenToVariant("background", colors),
  },
});
