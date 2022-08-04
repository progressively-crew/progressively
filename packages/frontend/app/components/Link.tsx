import { Link as RLink } from "@remix-run/react";
import { forwardRef, HTMLAttributes } from "react";

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  href?: string;
}
export const Link = forwardRef(
  ({ to, children, href, ...props }: LinkProps, ref: any) => {
    return (
      <div>
        <a
          as={href ? "a" : RLink}
          href={href}
          ref={ref}
          to={href ? undefined : to}
          {...props}
        >
          {children}
        </a>
      </div>
    );
  }
);

Link.displayName = "Link";
