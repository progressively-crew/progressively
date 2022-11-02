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
  variant?: "primary" | "secondary" | "tertiary";
  scheme?: "default" | "danger";
  icon?: React.ReactNode;
  small?: boolean;
}

const classCombination = {
  defaultprimary: "bg-indigo-700 text-white",
  defaultsecondary: "bg-indigo-50 text-indigo-700 text-indigo-700",
  defaulttertiary: "text-indigo-700",

  dangerprimary: "bg-red-700 text-white",
  dangersecondary: "bg-red-50 text-red-700 text-red-700",
  dangertertiary: "text-red-700",
};

export const Button = ({
  to,
  href,
  children,
  type,
  icon,
  isLoading,
  loadingText,
  scheme,
  variant,
  ...props
}: ButtonProps) => {
  const sharedButtonClass = "block rounded flex items-center h-10 px-4";
  const actuelScheme = scheme || "default";
  const actualVariant = variant || "primary";
  const combinedClassName = classCombination[actuelScheme + actualVariant];

  if (to || href) {
    const linkProps = props as HTMLAttributes<HTMLAnchorElement>;
    const Component = href ? "a" : Link;

    return (
      <Component
        to={href ? undefined : to}
        href={href}
        className={sharedButtonClass + " " + combinedClassName}
        {...linkProps}
      >
        <HStack spacing={3}>
          <span>{icon}</span>
          <span>{children}</span>
        </HStack>
      </Component>
    );
  }

  return (
    <button
      type={type}
      className={sharedButtonClass + " " + combinedClassName}
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
