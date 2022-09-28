import { Link } from "@remix-run/react";
import { HTMLAttributes } from "react";

import { styled } from "~/stitches.config";
import { HStack } from "../HStack";
import { Spinner } from "../Spinner";

export const RawButton = styled("button", {
  boxSizing: "border-box",
  background: "transparent",
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
  whiteSpace: "nowrap",

  "& svg": {
    borderRight: "1px solid currentColor",
    paddingRight: "$spacing$3",
  },

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
        borderRadius: "$borderRadius$small",
        height: "$ctaSmall",
        padding: "0 $spacing$2",

        "& svg": {
          paddingRight: "$spacing$2",
        },
      },
    },
    variant: {
      secondary: {
        background: "none",
        border: "1px solid $nemesis",
        color: "$nemesis",

        "&:active": {
          opacity: "0.9",
        },
      },
      tertiary: {
        background: "none",
        border: "2px solid transparent",
        color: "$nemesis",
        "&:active": {
          opacity: "0.9",
        },
        "&:hover": {
          background: "$heracles",
        },
      },

      primary: {
        background: "$nemesis",
        color: "$apollo",
        "&:active": {
          opacity: "0.8",
        },
      },
    },

    scheme: {
      danger: {
        background: "$tyche",
        color: "$apollo",
        "&:active": {
          opacity: "0.9",
        },
      },
    },
  },

  compoundVariants: [
    {
      scheme: "danger",
      variant: "secondary",
      css: {
        background: "transparent",
        border: "1px solid $tyche",
        color: "$tyche",

        "& svg": {
          color: "$tyche",
        },
      },
    },
    {
      scheme: "danger",
      variant: "tertiary",
      css: {
        background: "transparent",
        color: "$tyche",

        "& svg": {
          color: "$tyche",
        },
      },
    },
    {
      scheme: "inverse",
      variant: "tertiary",
      css: {
        background: "transparent",
        color: "$apollo",

        "& svg": {
          color: "$apollo",
        },

        "&:hover": {
          background: "$hadesLight",
        },
      },
    },
  ],
});

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  to?: string;
  href?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  type?: "button" | "submit" | "reset";
  variant?: "tertiary" | "primary" | "secondary";
  scheme?: "default" | "danger" | "inverse";
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
        <HStack spacing={3}>
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
      <HStack spacing={3}>
        {icon && isLoading && <Spinner />}
        {icon && !isLoading && icon}

        {children}
      </HStack>
    </RawButton>
  );
};
