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
  overflowX: "scroll",

  "& th": {
    padding: "$spacing$6 0",
    textAlign: "left",
    textTransform: "uppercase",
    fontSize: "$neptune",
    fontFamily: "$title",
  },

  "& tr td:first-of-type": {
    paddingLeft: "$spacing$12",
  },
  "& tr td:last-of-type": {
    paddingLeft: "$spacing$12",
  },

  "& tr th:first-of-type": {
    paddingLeft: "$spacing$12",
  },

  "& tr th:last-of-type": {
    paddingLeft: "$spacing$12",
  },

  "& thead tr:first-of-type": {
    borderTop: "none",
  },

  "& tr": {
    transition: "all 0.2s",
    borderTop: "1px solid $heracles",
  },

  "& tbody tr:hover": {
    background: "$heracles",
  },
  "& td": {
    padding: "$spacing$4 0",
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
