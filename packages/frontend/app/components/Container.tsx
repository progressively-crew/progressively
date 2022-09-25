import { sizes, styled, mapTokenToVariant } from "~/stitches.config";

export const Container = styled("div", {
  padding: "0 $spacing$12",
  margin: "0 auto",
  variants: {
    width: mapTokenToVariant("width", sizes),
  },

  "@mobile": {
    padding: "0 $spacing$4",
  },
});
