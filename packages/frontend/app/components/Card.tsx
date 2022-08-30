import { mapTokenToVariant, styled, spacing } from "~/stitches.config";

export const Card = styled("div", {
  display: "flex",
  flexDirection: "column",
  background: "$apollo",
  borderRadius: "$borderRadius$regular",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  overflow: "hidden",
});

export const CardContent = styled("div", {
  padding: "$spacing$12",
  variants: {
    padding: mapTokenToVariant("padding", spacing, "$spacing"),
    noTop: {
      true: {
        paddingTop: 0,
      },
    },
    noBottom: {
      true: {
        paddingBottom: 0,
      },
    },
  },
});
