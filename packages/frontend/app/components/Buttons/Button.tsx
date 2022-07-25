import { Link } from "@remix-run/react";
import { HTMLAttributes } from "react";

import { styled } from "~/stitches.config";
import { Spinner } from "../Spinner";

export const RawButton = styled("button", {
  boxSizing: "border-box",
  background: "$background",
  borderRadius: "$borderRadius$regular",
  padding: "0 $spacing$4",
  color: "$textAccent",
  fontSize: "$uranus",
  fontFamily: "$default",
  border: "2px solid $secondary",
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
        border: "2px solid $primary",
        background: "$primary",
        "&:active": {
          opacity: "0.9",
        },
      },

      primary: {
        background: "$secondary",
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
  gap: "$spacing$2",
});

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  to?: string;
  href?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  type?: "button" | "submit" | "reset";
  variant?: "ghost" | "danger" | "primary";
  icon?: React.ReactNode;
}

export const Button = ({
  to,
  href,
  children,
  type,
  icon,
  isLoading,
  loadingText,
  ...props
}: ButtonProps) => {
  if (to || href) {
    const linkProps = props as HTMLAttributes<HTMLAnchorElement>;

    return (
      <RawButton
        as={href ? "a" : Link}
        to={href ? undefined : to}
        href={href}
        {...linkProps}
      >
        <Wrapper>
          {icon}
          {children}
        </Wrapper>
      </RawButton>
    );
  }

  return (
    <RawButton
      type={type}
      {...props}
      aria-disabled={isLoading}
      aria-label={isLoading ? loadingText : undefined}
    >
      <Wrapper>
        {isLoading ? <Spinner /> : icon}
        {children}
      </Wrapper>
    </RawButton>
  );
};
