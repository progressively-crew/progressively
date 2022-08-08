import { Link as RLink } from "@remix-run/react";
import { forwardRef, HTMLAttributes } from "react";
import {
  colors,
  fontSizes,
  mapTokenToVariant,
  styled,
} from "~/stitches.config";

const RawLink = styled<any, any>("a", {
  display: "inline-flex",
  fontSize: "$jupiter",
  color: "$hades",
  fontFamily: "$default",
  height: "$cta",
  alignItems: "center",

  "&:active": {
    color: "$nemesis",
  },
  variants: {
    color: mapTokenToVariant("color", colors),
    fontSize: mapTokenToVariant("fontSize", fontSizes),
  },
});

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  endIcon?: string;
  startIcon?: string;
}
export const Link = forwardRef(
  ({ to, children, href, target, rel, ...props }: LinkProps, ref: any) => {
    return (
      <RawLink
        as={href ? "a" : RLink}
        href={href}
        ref={ref}
        to={href ? undefined : to}
        target={target}
        rel={rel}
        {...props}
      >
        {children}
      </RawLink>
    );
  }
);

Link.displayName = "Link";
