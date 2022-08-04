import { Link } from "@remix-run/react";
import { HTMLAttributes } from "react";
import { Spinner } from "../Spinner";

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
      <button
        as={href ? "a" : Link}
        to={href ? undefined : to}
        href={href}
        {...linkProps}
      >
        <span>
          {icon}
          {children}
        </span>
      </button>
    );
  }

  return (
    <button
      type={type}
      {...props}
      aria-disabled={isLoading}
      aria-label={isLoading ? loadingText : undefined}
    >
      <span>
        {isLoading ? <Spinner /> : icon}
        {children}
      </span>
    </button>
  );
};
