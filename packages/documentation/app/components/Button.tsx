import { Link } from "@remix-run/react";
import type { HTMLAttributes } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  to?: string;
  href?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary" | "secondary-inverse";
  scheme?: "default" | "danger";
  icon?: React.ReactNode;
  size?: "L" | "M";
}

const classCombination = {
  defaultprimary:
    "bg-indigo-700 text-white hover:bg-indigo-500 active:bg-indigo-600",
  defaultsecondary:
    "border border-indigo-500 text-indigo-700 text-indigo-700 hover:border-indigo-700 transition-all",
  defaulttertiary: "text-indigo-700 hover:bg-gray-50 active:bg-gray-100",
  "defaultsecondary-inverse":
    "border border-indigo-200 text-indigo-200 hover:text-indigo-400 hover:border-indigo-400 transition-all",

  dangerprimary: "bg-red-700 text-white hover:bg-red-500 active:bg-red-600",
  dangersecondary:
    "bg-red-100 text-red-700 text-red-700 hover:bg-red-50 active:bg-red-100",
  dangertertiary: "text-red-700",
  "dangersecondary-inverse": "",
};

const Sizes = {
  M: "h-10 px-4",
  L: "h-12 px-6 text-lg",
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
  const btnSizeStyle = Sizes[size];
  const sharedButtonClass =
    "block rounded flex items-center  whitespace-nowrap " + btnSizeStyle;
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
        className={
          sharedButtonClass + " " + combinedClassName + " " + className
        }
        {...linkProps}
      >
        <span className="flex flex-row gap-3 items-center">
          {icon}
          <span>{children}</span>
        </span>
      </Component>
    );
  }

  return (
    <button
      type={type}
      className={sharedButtonClass + " " + combinedClassName + " " + className}
      {...props}
      aria-disabled={isLoading}
      aria-label={isLoading ? loadingText : undefined}
    >
      <span className="flex flex-row gap-3 items-center">
        {icon}

        <span className={icon ? "text" : undefined}>{children}</span>
      </span>
    </button>
  );
};
