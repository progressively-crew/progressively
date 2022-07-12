import { Link } from "@remix-run/react";
import { HTMLAttributes } from "react";

import { styled } from "~/stitches.config";

export const RawButton = styled("button", {
  boxSizing: "border-box",
  background: "$background",
  borderRadius: "$borderRadius$regular",
  padding: "0 $spacing$4",
  color: "$title",
  fontSize: "$btn",
  fontFamily: "$default",
  border: "2px solid $hover",
  display: "inline-flex",
  textDecoration: "none",
  height: "$cta",
  cursor: "pointer",
  margin: 0,
  textAlign: "left",
  transition: "all 0.1s",

  "&:hover": {
    transform: "scale(1.05)",
  },

  "@mobile": {
    justifyContent: "center",
    width: "100%",
  },

  variants: {
    variant: {
      ghost: {
        background: "$backgroundAccent",
        border: "2px solid $border",
        "&:active": {
          background: "$background",
        },
      },
      danger: {
        background: "$primary",
        "&:active": {
          opacity: "0.9",
        },
      },

      primary: {
        background: "$hover",
        border: "none",
        color: "$background",
        "&:active": {
          opacity: "0.5",
        },
      },
    },
  },
});

const Wrapper = styled("span", {
  display: "flex",
  alignItems: "center",
  height: "100%",
  "& svg": {
    marginRight: "$spacing$2",
  },
});

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  to?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  type?: "button" | "submit" | "reset";
  variant?: "ghost" | "danger" | "primary";
  icon?: React.ReactNode;
}

export const Button = ({
  to,
  children,
  type,
  icon,
  isLoading,
  loadingText,
  ...props
}: ButtonProps) => {
  if (to) {
    const linkProps = props as HTMLAttributes<HTMLAnchorElement>;

    return (
      <RawButton as={Link} to={to} {...linkProps}>
        <Wrapper>
          {icon}
          {children}
        </Wrapper>
      </RawButton>
    );
  }

  return (
    <RawButton type={type} {...props}>
      <Wrapper>
        {icon}
        {children}
      </Wrapper>
    </RawButton>
  );
};
