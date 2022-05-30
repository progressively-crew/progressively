import { Link as RLink } from "remix";
import { forwardRef, HTMLAttributes } from "react";
import { styled } from "~/stitches.config";

const RawLink = styled("a", {
  display: "inline-flex",
  fontSize: "$content",
  color: "$content",
  fontFamily: "$default",
  height: "$cta",
  alignItems: "center",
  textDecoration: "none",
  position: "relative",
  overflow: "hidden",
  padding: "0 $spacing$2",
  margin: "0 -$spacing$2",
  borderRadius: "$borderRadius$regular",

  "&:before": {
    content: "''",
    background: "$hover",
    position: "absolute",
    height: "4px",
    width: "0%",
    bottom: "$spacing$1",
    transition: "width 0.2s",
  },

  "@media (prefers-reduced-motion: reduce)": {
    "&:before": { transition: "unset" },
  },

  "&:hover": {
    "&:before": {
      width: "100%",
    },
  },

  "&:active": {
    color: "$hover",
  },
});

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}
export const Link = forwardRef(
  ({ to, children, ...props }: LinkProps, ref: any) => {
    return (
      <div>
        <RawLink as={RLink} ref={ref} to={to} {...props}>
          {children}
        </RawLink>
      </div>
    );
  }
);

Link.displayName = "Link";
