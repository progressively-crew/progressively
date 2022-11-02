import { Link as RLink } from "@remix-run/react";
import { forwardRef, HTMLAttributes } from "react";

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  to?: string;
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  endIcon?: string;
  startIcon?: string;
  active?: string;
  hover?: string;
  fontSize?: string;
  height?: string;
}
export const Link = forwardRef(
  ({ to, children, href, target, rel, ...props }: LinkProps, ref: any) => {
    const Component = href ? "a" : RLink;
    return (
      <Component
        href={href}
        ref={ref}
        to={href ? undefined : to}
        target={target}
        rel={rel}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Link.displayName = "Link";
