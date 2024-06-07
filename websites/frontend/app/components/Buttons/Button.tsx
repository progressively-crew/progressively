import { Link } from "@remix-run/react";
import { HTMLAttributes, forwardRef } from "react";
import { Spinner } from "../Spinner";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  to?: string;
  href?: string;
  children?: React.ReactNode;
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
  size?: "M" | "S";
  form?: string;
  name?: string;
  value?: string;
}

const classCombination = {
  defaultprimary: "bg-gray-800 text-white hover:bg-gray-600 active:bg-gray-500",
  defaultsecondary:
    "bg-transparent border border-gray-200 hover:bg-gray-50 active:bg-gray-100",
  defaulttertiary: "bg-transparent hover:bg-gray-50 active:bg-gray-100",

  dangerprimary: "bg-red-700 text-white hover:bg-red-600 active:bg-red-500",
  dangersecondary:
    "bg-transparent border border-red-200 hover:bg-red-100 text-red-700",
  dangertertiary: "text-red-700 hover:bg-red-100",

  "defaulttertiary-inverse": "text-white bg-transparent hover:bg-gray-700",
  "defaultsecondary-inverse":
    "text-white border border-gray-50 hover:bg-gray-800",
};

const sizeClasses = {
  M: "h-10 px-4 gap-4",
  S: "h-7 px-2 gap-2 text-sm",
};

export const Button = forwardRef(
  (
    {
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
    }: ButtonProps,
    ref: any
  ) => {
    const sharedButtonClass =
      "relative whitespace-nowrap inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";

    const actuelScheme = scheme || "default";
    const actualVariant = variant || "primary";
    const combinedClassName = classCombination[actuelScheme + actualVariant];
    const sizeClass = sizeClasses[size];

    if (to || href) {
      const linkProps = props as HTMLAttributes<HTMLAnchorElement>;
      const Component = href ? "a" : Link;

      return (
        <Component
          ref={ref}
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
        ref={ref}
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
        aria-label={isLoading ? loadingText : props["aria-label"]}
      >
        {isLoading && <Spinner className="text-xl absolute" />}
        {icon && (
          <span className={isLoading ? "opacity-0" : undefined}>{icon}</span>
        )}
        {children && (
          <span className={isLoading ? "opacity-0" : undefined}>
            {children}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
