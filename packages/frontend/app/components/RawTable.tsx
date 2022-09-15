import { forwardRef } from "react";
import { styled } from "~/stitches.config";

const Wrapper = styled("div", {
  overflowX: "auto",
  overflowY: "clip",
});

const Table = styled("table", {
  color: "$hades",
  fontFamily: "$default",
  whiteSpace: "nowrap",
  width: "100%",

  "& th": {
    verticalAlign: "middle",
    height: "$cta",
    textAlign: "left",
    textTransform: "uppercase",
    fontSize: "$neptune",
    fontFamily: "$title",
  },

  "& td": {
    verticalAlign: "middle",
    height: "$cta",
    padding: "0 $spacing$2",
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
