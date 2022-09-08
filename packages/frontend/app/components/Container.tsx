import { styled } from "~/stitches.config";

export const Container = styled("div", {
  paddingLeft: "$spacing$12",
  paddingRight: "300px", // side nav width
  maxWidth: "140ch",

  "@desktop": {
    padding: "0 $spacing$12",
  },

  "@mobile": {
    padding: "0 $spacing$4",
  },
});
