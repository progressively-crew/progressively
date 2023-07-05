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
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "tertiary-inverse"
    | "secondary-inverse";
  scheme?: "default" | "danger";
  icon?: React.ReactNode;
  size?: "M";
  form?: string;
}

const classCombination = {
  defaultprimary:
    "bg-slate-800 text-white hover:bg-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600",
  defaultsecondary:
    "bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-600",
  defaulttertiary:
    "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100",

  dangerprimary: "bg-red-600 text-white hover:bg-red-500",
  dangersecondary:
    "bg-transparent border border-red-200 hover:bg-red-100 dark:border-red-700 dark:text-red-100 text-red-700",
  dangertertiary:
    "text-red-700 dark:text-red-200 hover:dark:bg-slate-800 hover:bg-red-100",

  "defaulttertiary-inverse": "text-white bg-transparent hover:bg-slate-700",
  "defaultsecondary-inverse":
    "text-white border border-slate-50 hover:bg-slate-800",
};

const sizeClasses = {
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
  const sharedButtonClass =
    "relative whitespace-nowrap inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900";

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
      {isLoading && <Spinner className="text-xl absolute" />}
      <span className={isLoading ? "opacity-0" : undefined}>{icon}</span>
      <span className={isLoading ? "opacity-0" : undefined}>{children}</span>
    </button>
  );
};
