import { styled } from "~/stitches.config";

export const Container = styled("div", {
  margin: "0 auto",
  padding: "0 $spacing$12",

  "@mobile": {
    padding: "0 $spacing$4",
  },
});
