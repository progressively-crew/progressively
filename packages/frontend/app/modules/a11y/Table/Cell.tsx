import { HTMLAttributes } from "react";

export interface CellProps extends HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}
export const Cell = (props: CellProps) => {
  return <td tabIndex={-1} {...props} />;
};
