import { Typography } from "./Typography";
import { styled } from "~/stitches.config";

export const TagLine = styled(Typography, {
  display: "block",
  textTransform: "uppercase",
  fontSize: "$uranus",
  fontWeight: "$slim",
  letterSpacing: "2px",
  variants: {
    small: {
      true: {
        fontSize: "$neptune",
      },
    },
  },
});
