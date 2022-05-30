import { HTMLAttributes } from "react";
import { Link } from "remix";
import { styled } from "~/stitches.config";

export const RawButton = styled("button", {
  boxSizing: "border-box",
  background: "$background",
  borderRadius: "$borderRadius$regular",
  padding: "0 $spacing$4",
  color: "$title",
  fontSize: "$btn",
  fontFamily: "$default",
  border: "2px solid $primary",
  display: "inline-flex",
  textDecoration: "none",
  height: "$cta",
  cursor: "pointer",
  margin: 0,
  transition: "all 0.2s",

  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
    },

    variant: {
      ghost: {
        background: "$backgroundAccent",
        border: "2px solid $border",
        "&:hover": {
          background: "$background",
        },
      },
      danger: {
        background: "$primary",
      },
      success: {
        background: "$successBg",
        border: "1px solid $successBorder",
        color: "$background",
        "&:hover": {
          opacity: "0.9",
        },
      },
    },
  },
});

const Wrapper = styled("span", {
  display: "flex",
  alignItems: "center",
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
  variant?: "ghost" | "danger" | "success";
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button = ({
  to,
  children,
  type,
  fullWidth,
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
    <RawButton type={type} fullWidth={fullWidth} {...props}>
      <Wrapper>
        {icon}
        {children}
      </Wrapper>
    </RawButton>
  );
};
