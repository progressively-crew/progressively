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
  scheme?: "default" | "danger" | "inverse";
  icon?: React.ReactNode;
  small?: boolean;
}

const classCombination = {
  // primary
  defaultprimary: "bg-indigo-700 text-white",
  dangerprimary: "bg-red-700 text-white",
  inverseprimary: "bg-indigo-100 text-indigo-700",

  // secondary
  defaultsecondary: "border-1 border-indigo-700",
  dangersecondary: "bg-red-700 text-white",
  inversesecondary: "bg-indigo-100 text-indigo-700",
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
  const actuelScheme = scheme || "default";
  const actualVariant = variant || "primary";
  const combinedClassName = classCombination[actuelScheme + actualVariant];
  const sharedButtonClass = "block rounded flex items-center h-10 px-4";

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
