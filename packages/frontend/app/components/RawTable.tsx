import { forwardRef } from "react";
import { styled } from "~/stitches.config";

const Wrapper = styled("div", {
  display: "block",
  width: "100%",
  overflowX: "auto",
});

const Table = styled("table", {
  color: "$hades",
  width: "100%",
  fontFamily: "$default",

  "& th": {
    padding: "$spacing$4",
    textAlign: "left",
    textTransform: "uppercase",
    fontSize: "$neptune",
    fontFamily: "$title",
  },

  "& tr": {
    borderBottom: "1px solid $apollo",
  },

  "& tbody tr:hover": {
    background: "$apollo",
  },
  "& td": {
    padding: "$spacing$4",
    color: "$hades",
  },
  "& a": {
    color: "$hades",
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
