import { styled } from "~/stitches.config";

export const Typography = styled("p", {
  color: "$text",
  fontSize: "$jupiter",
  fontFamily: "$default",
  lineHeight: "$text",
  maxWidth: "60ch",

  "& strong": {
    fontWeight: "bold",
    color: "$textAccent",
  },

  variants: {
    size: {
      small: {
        fontSize: "$cta",
      },
    },
  },
});
