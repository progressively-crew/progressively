import { Typography } from "./Typography";
import { styled } from "~/stitches.config";

export const TagLine = styled(Typography, {
  display: "block",
  textTransform: "uppercase",
  fontSize: "$btn",
  fontWeight: "$slim",
  letterSpacing: "2px",
  variants: {
    small: {
      true: {
        fontSize: "$xs",
      },
    },
  },
});
