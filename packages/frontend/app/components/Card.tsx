import { mapTokenToVariant, styled, shadows } from "~/stitches.config";

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

  "@mobile": {
    padding: "$spacing$6",
  },

  variants: {
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
