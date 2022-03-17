/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext } from "react";

interface TableContextType {
  onSelectAll: () => void;
  onSelect: (nextSelection: any) => void;
  selections: Array<any>;
  indeterminate: boolean;
}

const TableContext = createContext<TableContextType>({
  onSelectAll: () => undefined,
  onSelect: () => undefined,
  selections: [],
  indeterminate: false,
});

export interface TableProviderProps<T> {
  children: React.ReactNode;
  onSelect: (nextSelection: T) => void;
  onSelectAll: () => void;
  selections: Array<T>;
  indeterminate: boolean;
}

export const TableProvider = <T,>({
  children,
  onSelect,
  onSelectAll,
  selections,
  indeterminate,
}: TableProviderProps<T>) => {
  return (
    <TableContext.Provider
      value={{ onSelect, selections, onSelectAll, indeterminate }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useSelections = () => useContext(TableContext);
