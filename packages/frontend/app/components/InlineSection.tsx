import { styled } from "~/stitches.config";

export const InlineSection = styled("section", {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  gap: "$spacing$10",

  "@mobile": {
    gridTemplateColumns: "unset",
    gridTemplateRows: "auto auto",
    gap: "$spacing$6",
  },
});

export const InlineSectionDescription = styled("p", {
  color: "$hades",
  fontFamily: "$default",
  lineHeight: "$text",
});
