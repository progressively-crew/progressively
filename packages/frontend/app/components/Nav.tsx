import { styled } from "~/stitches.config";

export const Nav = styled("nav", {
  padding: "$spacing$4 $spacing$12",
  display: "flex",
  justifyContent: "space-between",
  background: "$backgroundAccent",

  "@mobile": {
    padding: "$spacing$4",
  },
});
