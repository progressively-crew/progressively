import { styled } from "~/stitches.config";

export const Heading = styled("h2", {
  color: "$textAccent",
  fontWeight: "$fontWeights$semiBold",
  fontFamily: "$default",

  variants: {
    as: {
      h2: {
        "& a": {
          fontSize: "$earth",
        },
        fontSize: "$earth",
      },
      h3: {
        "& a": {
          fontSize: "$mars",
        },
        fontSize: "$mars",
      },
    },
  },
});
