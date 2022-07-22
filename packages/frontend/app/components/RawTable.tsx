import { forwardRef } from "react";
import { styled } from "~/stitches.config";

const Wrapper = styled("div", {
  display: "block",
  width: "100%",
  overflowX: "auto",
});

const Table = styled("table", {
  color: "$text",
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
    color: "$textAccent",
  },
  "& a": {
    color: "$textAccent",
  },
});

export const RawTable = forwardRef((props: any, ref: any) => {
  return (
    <Wrapper>
      <Table ref={ref} {...props} />
    </Wrapper>
  );
});

RawTable.displayName = "RawTable";
