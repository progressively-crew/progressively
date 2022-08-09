import { HTMLAttributes } from "react";

export interface ColProps extends HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}
export const Col = ({ children, ...props }: ColProps) => {
  return (
    <th tabIndex={-1} {...props}>
      {children}
    </th>
  );
};
