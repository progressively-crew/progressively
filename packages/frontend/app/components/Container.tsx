import { styled } from "~/stitches.config";

export const Container = styled("div", {
  padding: "0 $spacing$12",
  maxWidth: "$container",
  margin: "0 auto",

  "@tablet": {
    padding: "0 $spacing$12",
  },

  "@mobile": {
    padding: "0 $spacing$4",
  },
});
