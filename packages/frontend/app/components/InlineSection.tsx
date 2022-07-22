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

export const InlineSectionTitle = styled("h2", {
  color: "$textAccent",
  fontFamily: "$default",
  fontSize: "$text",
  fontWeight: "$semiBold",
  marginBottom: "$spacing$2",

  "@mobile": {
    fontSize: "$h2",
  },
});

export const InlineSectionDescription = styled("p", {
  color: "$text",
  fontFamily: "$default",
  lineHeight: "$text",
});
