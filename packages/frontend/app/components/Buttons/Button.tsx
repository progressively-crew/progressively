import { Link } from "@remix-run/react";
import { HTMLAttributes } from "react";
import { HStack } from "../HStack";
import { Spinner } from "../Spinner";

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
  scheme,
  ...props
}: ButtonProps) => {
  if (to || href) {
    const linkProps = props as HTMLAttributes<HTMLAnchorElement>;
    const Component = href ? "a" : Link;

    return (
      <Component to={href ? undefined : to} href={href} {...linkProps}>
        <HStack spacing={3}>
          {icon}
          <span className="text">{children}</span>
        </HStack>
      </Component>
    );
  }

  return (
    <button
      type={type}
      {...props}
      aria-disabled={isLoading}
      aria-label={isLoading ? loadingText : undefined}
    >
      <HStack spacing={3}>
        {icon && isLoading && <Spinner />}
        {icon && !isLoading && icon}

        <span className={icon ? "text" : undefined}>{children}</span>
      </HStack>
    </button>
  );
};
