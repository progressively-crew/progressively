import { styled } from "~/stitches.config";

export const Typography = styled("p", {
  color: "$content",
  fontSize: "$content",
  fontFamily: "$default",
  lineHeight: "$content",
  maxWidth: "60ch",

  "& strong": {
    fontWeight: "bold",
    color: "$title",
  },

  variants: {
    size: {
      small: {
        fontSize: "$cta",
      },
    },
  },
});
