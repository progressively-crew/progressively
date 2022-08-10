import { forwardRef } from "react";
import { styled } from "~/stitches.config";

const Wrapper = styled("div", {
  overflowX: "auto",
});

const Table = styled("table", {
  color: "$hades",
  fontFamily: "$default",
  whiteSpace: "nowrap",
  width: "100%",
  height: "100%",

  "& th": {
    padding: "$spacing$6 $spacing$3",
    textAlign: "left",
    textTransform: "uppercase",
    fontSize: "$neptune",
    fontFamily: "$title",
  },

  "& td": {
    padding: "$spacing$4 $spacing$3",
    color: "$hades",
  },

  "& td a": {
    fontSize: "$uranus",
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

  "& tbody tr.clickable": {
    cursor: "pointer",
  },

  "& tbody tr.clickable:active": {
    background: "$hera",
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

export interface TrProps {
  onClick: () => void;
  children: React.ReactNode;
}
export const Tr = ({ children, onClick }: TrProps) => {
  const isClickable = Boolean(onClick);

  return (
    <tr onClick={onClick} className={isClickable ? "clickable" : undefined}>
      {children}
    </tr>
  );
};

RawTable.displayName = "RawTable";
