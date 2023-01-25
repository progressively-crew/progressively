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
  variant?: "primary" | "secondary" | "tertiary";
  scheme?: "default" | "danger";
  icon?: React.ReactNode;
  size?: "S" | "M";
}

const classCombination = {
  defaultprimary:
    "bg-indigo-700 text-white hover:bg-indigo-500 active:bg-indigo-600",
  defaultsecondary:
    "border border-indigo-500 text-indigo-700 text-indigo-700 hover:border-indigo-700 transition-all dark:border-indigo-200 dark:text-indigo-200",
  defaulttertiary:
    "text-indigo-700 dark:text-indigo-200 hover:bg-gray-50 hover:dark:bg-slate-700 active:bg-gray-100 active:dark:bg-slate-800",

  dangerprimary: "bg-red-600 text-white hover:bg-red-500 active:bg-red-600",
  dangersecondary: "bg-red-50 text-red-700 hover:bg-red-100 active:bg-red-200",
  dangertertiary:
    "text-red-700 dark:text-red-200 hover:dark:bg-slate-800 active:dark:bg-slate-700 hover:bg-red-100 active:bg-red-50",
};

const sizeClasses = {
  S: "h-6 px-1 text-xs gap-1",
  M: "h-10 px-4 gap-4",
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
  className,
  size = "M",
  ...props
}: ButtonProps) => {
  const sharedButtonClass = "block rounded flex items-center whitespace-nowrap";
  const actuelScheme = scheme || "default";
  const actualVariant = variant || "primary";
  const combinedClassName = classCombination[actuelScheme + actualVariant];
  const sizeClass = sizeClasses[size];

  if (to || href) {
    const linkProps = props as HTMLAttributes<HTMLAnchorElement>;
    const Component = href ? "a" : Link;

    return (
      <Component
        to={href ? undefined : to}
        href={href}
        className={
          sharedButtonClass +
          " " +
          combinedClassName +
          " " +
          className +
          " " +
          sizeClass
        }
        {...linkProps}
      >
        {icon && <span>{icon}</span>}
        {children}
      </Component>
    );
  }

  return (
    <button
      type={type}
      className={
        sharedButtonClass +
        " " +
        combinedClassName +
        " " +
        className +
        " " +
        sizeClass
      }
      {...props}
      aria-disabled={isLoading}
      aria-label={isLoading ? loadingText : undefined}
    >
      {icon && isLoading && <Spinner />}
      {icon && !isLoading && icon}

      <span className={icon ? "text" : undefined}>{children}</span>
    </button>
  );
};
