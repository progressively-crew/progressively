import { Link as RLink } from "remix";

import { forwardRef, HTMLAttributes } from "react";

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}
export const Link = forwardRef(
  ({ to, children, ...props }: LinkProps, ref: any) => {
    return (
      <RLink ref={ref} to={to} {...props}>
        {children}
      </RLink>
    );
  }
);

Link.displayName = "Link";
