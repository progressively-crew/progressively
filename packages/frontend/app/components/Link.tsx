import { Link as RLink } from "@remix-run/react";
import { forwardRef, HTMLAttributes } from "react";
import { styled } from "~/stitches.config";

const RawLink = styled("a", {
  display: "inline-flex",
  fontSize: "$text",
  color: "$text",
  fontFamily: "$default",
  height: "$cta",
  alignItems: "center",

  "&:active": {
    color: "$textAccent",
  },
});

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  href?: string;
}
export const Link = forwardRef(
  ({ to, children, href, ...props }: LinkProps, ref: any) => {
    return (
      <div>
        <RawLink
          as={href ? "a" : RLink}
          href={href}
          ref={ref}
          to={href ? undefined : to}
          {...props}
        >
          {children}
        </RawLink>
      </div>
    );
  }
);

Link.displayName = "Link";
