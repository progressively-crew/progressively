import { HTMLAttributes } from "react";
import { TagLine } from "~/components/Tagline";

export interface ColProps extends HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}
export const Col = ({ children, ...props }: ColProps) => {
  return (
    <th tabIndex={-1} {...props}>
      <TagLine small>{children}</TagLine>
    </th>
  );
};
