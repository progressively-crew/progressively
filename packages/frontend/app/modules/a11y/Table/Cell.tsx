import { Td } from "@chakra-ui/react";
import { HTMLAttributes } from "react";

export interface CellProps extends HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}
export const Cell = (props: CellProps) => {
  return <Td tabIndex={-1} whiteSpace={"nowrap"} {...props} />;
};
