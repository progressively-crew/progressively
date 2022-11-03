import { HTMLAttributes } from "react";
import { Th } from "~/components/RawTable";

export interface ColProps extends HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}
export const Col = ({ children, ...props }: ColProps) => {
  return (
    <Th tabIndex={-1} {...props}>
      {children}
    </Th>
  );
};
