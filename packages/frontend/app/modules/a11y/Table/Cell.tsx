import { HTMLAttributes } from "react";
import { Td } from "~/components/RawTable";

export interface CellProps extends HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}
export const Cell = (props: CellProps) => {
  return <Td tabIndex={-1} {...props} />;
};
