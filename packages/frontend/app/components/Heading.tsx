import { fontSizes, mapTokenToVariant, styled } from "~/stitches.config";

export const Heading = styled<any, any>("h2", {
  color: "$hades",
  fontFamily: "$title",
  variants: {
    fontSize: mapTokenToVariant("fontSize", fontSizes),
  },
});
