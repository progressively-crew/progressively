import { styled } from "~/stitches.config";

export const Nav = styled("nav", {
  padding: "$spacing$4 $spacing$21",
  display: "flex",
  justifyContent: "space-between",
  background: "$hades",

  "@mobile": {
    padding: "$spacing$4",
  },
});
