import { HTMLAttributes } from "react";
import { styled } from "~/stitches.config";
import { Link } from "../Link";

export const RawButton = styled("button", {
  background: "$background",
  borderRadius: "$borderRadius$regular",
  padding: "$spacing$3 $spacing$4",
  color: "$title",
  fontSize: "$btn",
  fontFamily: "$default",
  border: "2px solid $primary",
  display: "inline-block",
  textDecoration: "none",
  height: "$cta",
  cursor: "pointer",
  margin: 0,
  lineHeight: 1,

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
  variant?: "ghost";
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
