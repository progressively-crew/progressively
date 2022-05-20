import { HTMLAttributes } from "react";

export interface ColProps extends HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}
export const Col = (props: ColProps) => {
  return <th tabIndex={-1} {...props} />;
};
