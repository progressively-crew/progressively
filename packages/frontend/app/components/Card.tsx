import { mapTokenToVariant, styled, spacing, shadows } from "~/stitches.config";

export const Card = styled("div", {
  display: "flex",
  flexDirection: "column",
  background: "$apollo",
  borderRadius: "$borderRadius$regular",
  boxShadow: "$regular",
  overflow: "hidden",
  variants: {
    boxShadow: mapTokenToVariant("boxShadow", shadows),
  },
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
