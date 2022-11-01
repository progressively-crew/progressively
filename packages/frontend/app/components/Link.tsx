import { Link as RLink } from "@remix-run/react";
import { forwardRef, HTMLAttributes } from "react";
import {
  colors,
  fontSizes,
  mapTokenToVariant,
  sizes,
  styled,
} from "~/stitches.config";

const RawLink = styled<any, any>("a", {
  display: "inline-flex",
  fontSize: "$jupiter",
  fontFamily: "$default",
  height: "$cta",
  alignItems: "center",
  borderRadius: "$borderRadius$regular",
  padding: "$spacing$2",
  margin: "-$spacing$2",
  transition: "all 0.1s",

  "&:active": {
    color: "$nemesis",
  },
  variants: {
    active: mapTokenToVariant("color", colors, undefined, "active"),
    color: mapTokenToVariant("color", colors),
    fontSize: mapTokenToVariant("fontSize", fontSizes),
    height: mapTokenToVariant("height", sizes),
  },
});

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
