import { colors, mapTokenToVariant, styled } from "./stitches.config";

export const Divider = styled("hr", {
  height: "2px",
  backgroundColor: "$heracles",
  display: "block",
  border: 0,
  width: "100%",
  variants: {
    background: mapTokenToVariant("background", colors),
  },
});
