import { styled } from "~/stitches.config";

export const Card = styled("div", {
  display: "flex",
  flexDirection: "column",
  background: "$apollo",
  borderRadius: "$borderRadius$regular",
  border: "1px solid $border",
  overflow: "hidden",
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
