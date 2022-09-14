import { sizes, styled, mapTokenToVariant } from "~/stitches.config";

export const Container = styled("div", {
  padding: "0 $spacing$12",
  maxWidth: "140ch",
  margin: "0 auto",
  variants: {
    width: mapTokenToVariant("width", sizes),
  },

  "@desktop": {
    padding: "0 $spacing$12",
  },

  "@mobile": {
    padding: "0 $spacing$4",
  },
});
