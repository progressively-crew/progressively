import { styled } from "~/stitches.config";

export const Heading = styled("h2", {
  color: "$title",
  fontWeight: "$fontWeights$semiBold",
  fontFamily: "$default",

  variants: {
    as: {
      h2: {
        "& a": {
          fontSize: "$h2",
        },
        fontSize: "$h2",
      },
      h3: {
        "& a": {
          fontSize: "$h3",
        },
        fontSize: "$h3",
      },
    },
  },
});
