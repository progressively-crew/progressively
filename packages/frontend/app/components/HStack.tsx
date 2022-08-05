import { styled, mapTokenToVariant, spacing } from "~/stitches.config";

export const HStack = styled<any, any>("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  variants: {
    spacing: mapTokenToVariant("gap", spacing, "$spacing"),
  },
});
