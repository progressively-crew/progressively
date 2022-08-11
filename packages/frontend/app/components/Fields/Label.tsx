import { styled, mapTokenToVariant, fontSizes } from "~/stitches.config";

export const Label = styled("label", {
  fontFamily: "$default",
  color: "$hades",
  fontSize: "$jupiter",
  display: "block",
  variants: {
    size: mapTokenToVariant("fontSize", fontSizes),
  },
});
