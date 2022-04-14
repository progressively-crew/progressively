import { Th } from "@chakra-ui/react";
import { HTMLAttributes } from "react";

export interface ColProps extends HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}
export const Col = (props: ColProps) => {
  return <Th tabIndex={-1} {...props} />;
};
