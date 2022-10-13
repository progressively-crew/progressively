import { styled, mapTokenToVariant, spacing } from "~/stitches.config";

export const Stack = styled<any, any>("div", {
  display: "flex",
  flexDirection: "column",

  variants: {
    spacing: mapTokenToVariant("gap", spacing, "$spacing"),
    justifyContent: {
      center: {
        justifyContent: "center",
      },
    },
  },
});
