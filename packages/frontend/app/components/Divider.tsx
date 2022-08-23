import { colors, mapTokenToVariant, styled } from "~/stitches.config";

export const Divider = styled("hr", {
  height: "2px",
  backgroundColor: "$heracles",
  display: "block",
  border: 0,
  width: "100%",
  margin: 0,
  padding: 0,
  variants: {
    background: mapTokenToVariant("background", colors),
  },
});
