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
  color: "$title",
  fontFamily: "$default",
  fontSize: "$content",
  fontWeight: "$semiBold",
  marginBottom: "$spacing$2",

  "@mobile": {
    fontSize: "$h2",
  },
});

export const InlineSectionDescription = styled("p", {
  color: "$content",
  fontFamily: "$default",
  lineHeight: "$content",
});
