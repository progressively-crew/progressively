import React, { useRef } from "react";
import { styled } from "~/stitches.config";
import { KeyboardKeys } from "../utils/keyboardKeys";
import { TableProvider } from "./TableContext";
import { moveToCol, moveToRow } from "./utils";

const TableWrapper = styled("table", {
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
});

export interface TableProps {
  children: React.ReactNode;
  labelledBy: string;
  onSelect: (nextSelection: Array<string>) => void;
  selected: Array<string>;
}

export const Table = ({
  children,
  labelledBy,
  onSelect,
  selected,
}: TableProps) => {
  const tableRef = useRef<HTMLTableElement>(null);

  let colCount = 0;
  let rowCount = 0;

  React.Children.toArray(children).forEach((rawNode) => {
    const node = rawNode as JSX.Element;

    if (node.type.name.includes("Thead")) {
      const cols = React.Children.toArray(node.props.children);
      colCount = cols.length + 1;
    } else if (node.type.name.includes("Tbody")) {
      const rows = React.Children.toArray(node.props.children);
      rowCount = rows.length + 1;
    }
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableElement>) => {
    switch (e.key) {
      case KeyboardKeys.DOWN: {
        if (!tableRef.current) return;

        const target = e.target as HTMLElement;
        const nextFocusable = moveToRow(target, tableRef.current, 1);

        if (nextFocusable) {
          e.preventDefault();

          target.setAttribute("tabindex", "-1");
          nextFocusable.setAttribute("tabindex", "0");

          nextFocusable.focus();
        }

        break;
      }

      case KeyboardKeys.UP: {
        if (!tableRef.current) return;

        const target = e.target as HTMLElement;
        const nextFocusable = moveToRow(target, tableRef.current, -1);

        if (nextFocusable) {
          e.preventDefault();

          target.setAttribute("tabindex", "-1");
          nextFocusable.setAttribute("tabindex", "0");

          nextFocusable.focus();
        }

        break;
      }

      case KeyboardKeys.RIGHT: {
        const target = e.target as HTMLElement;
        const nextFocusable = moveToCol(target, 1);

        if (nextFocusable) {
          e.preventDefault();

          target.setAttribute("tabindex", "-1");
          nextFocusable.setAttribute("tabindex", "0");

          nextFocusable.focus();
        }

        break;
      }

      case KeyboardKeys.LEFT: {
        const target = e.target as HTMLElement;
        const nextFocusable = moveToCol(target, -1);

        if (nextFocusable) {
          e.preventDefault();

          target.setAttribute("tabindex", "-1");
          nextFocusable.setAttribute("tabindex", "0");

          nextFocusable.focus();
        }

        break;
      }
    }
  };

  const handleSelect = (nextSelection: string) => {
    const indexToRemove = selected.indexOf(nextSelection);

    if (indexToRemove > -1) {
      return onSelect(selected.filter((sel) => sel !== nextSelection));
    }

    return onSelect([...selected, nextSelection]);
  };

  const handleSelectAll = () => {
    if (selected.length > 0) {
      return onSelect([]);
    }

    const nextSelections: Array<string> = [];

    React.Children.toArray(children).forEach((rawNode) => {
      const node = rawNode as JSX.Element;

      if (node.type.name.includes("Tbody")) {
        const rows = React.Children.toArray(node.props.children);
        rows.forEach((row) => {
          if (React.isValidElement(row)) {
            if (!row.props.disabled) {
              nextSelections.push(row.props.selection);
            }
          }
        });
      }
    });

    return onSelect(nextSelections);
  };

  return (
    <TableProvider<string>
      selections={selected}
      onSelect={handleSelect}
      onSelectAll={handleSelectAll}
      indeterminate={selected.length > 0 && selected.length < rowCount - 1}
    >
      <TableWrapper
        ref={tableRef}
        role="grid"
        aria-rowcount={rowCount}
        aria-colcount={colCount}
        aria-labelledby={labelledBy}
        onKeyDown={handleKeyDown}
      >
        {children}
      </TableWrapper>
    </TableProvider>
  );
};
