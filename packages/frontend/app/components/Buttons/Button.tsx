import { Link } from "@remix-run/react";
import { HTMLAttributes } from "react";

import { styled } from "~/stitches.config";
import { HStack } from "../HStack";
import { Spinner } from "../Spinner";

export const RawButton = styled("button", {
  boxSizing: "border-box",
  background: "$apollo",
  borderRadius: "$borderRadius$regular",
  padding: "0 $spacing$4",
  color: "$hades",
  fontSize: "$uranus",
  fontFamily: "$default",
  border: "2px solid transparent",
  display: "inline-flex",
  alignItems: "center",
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
    small: {
      true: {
        height: "$ctaSmall",
        padding: "0 $spacing$2",
      },
    },
    variant: {
      secondary: {
        background: "none",
        border: "2px solid $nemesis",
        color: "$nemesis",
        "&:active": {
          opacity: "0.9",
        },
      },
      ghost: {
        background: "none",
        border: "2px solid transparent",
        color: "$hermes",
        "&:active": {
          opacity: "0.9",
        },
      },
      danger: {
        background: "$tyche",
        color: "$hades",
        "&:active": {
          opacity: "0.9",
        },
      },

      primary: {
        background: "$hermes",
        color: "$hades",
        "&:active": {
          opacity: "0.8",
        },
      },
    },
  },
});

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  to?: string;
  href?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  type?: "button" | "submit" | "reset";
  variant?: "ghost" | "danger" | "primary" | "secondary";
  icon?: React.ReactNode;
  small?: boolean;
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
        <HStack spacing={2}>
          {icon}
          {children}
        </HStack>
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
      <HStack spacing={2}>
        {isLoading ? <Spinner /> : icon}
        {children}
      </HStack>
    </RawButton>
  );
};
