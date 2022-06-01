import { styled } from "~/stitches.config";

export const RawTable = styled("table", {
  color: "$content",
  width: "100%",
  fontFamily: "$default",

  "& th": {
    padding: "$spacing$4",
    textAlign: "left",
    background: "$background",
  },
  "& th:first-of-type": {
    borderStartStartRadius: "$borderRadius$regular",
  },
  "& th:last-of-type": {
    borderStartEndRadius: "$borderRadius$regular",
  },
  "& tr": {
    borderBottom: "1px solid $border",
  },
  "& tbody tr": {
    "&:focus-within": {
      background: "$border",
    },

    "&.row-selected": {
      background: "$background",
    },
  },
  "& td": {
    padding: "$spacing$4",
  },
  "& a": {
    color: "$title",
  },
});
