import { sizes, styled, mapTokenToVariant } from "~/stitches.config";

export const Container = styled("div", {
  padding: "0 $spacing$12",
  margin: "0 auto",
  maxWidth: "$container",
  variants: {
    maxWidth: mapTokenToVariant("maxWidth", sizes),
  },

  "@mobile": {
    padding: "0 $spacing$4",
  },
});
