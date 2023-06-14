import React from "react";

export interface CardProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
  scheme?: "ERROR" | "DEFAULT";
  className?: string;
}

const footerSchemeStyles = {
  ERROR: "bg-red-50 dark:bg-slate-700",
  DEFAULT: "bg-gray-50 dark:bg-slate-700",
};

export const Card = ({
  children,
  footer,
  onClick,
  scheme = "DEFAULT",
  className,
}: CardProps) => {
  const footerSchemeClassName = footerSchemeStyles[scheme];
  const clickableClasses = onClick
    ? "hover:border-gray-300 hover:shadow-sm hover:dark:bg-slate-700 active:bg-gray-50 active:dark:bg-slate-600 cursor-pointer transition-all"
    : "";

  return (
    <div
      className={`border border-gray-200 dark:border-slate-700 rounded-md bg-white dark:border-slate-700 dark:bg-slate-800 ${clickableClasses} ${
        className || ""
      }`}
      onClick={onClick}
    >
      {children}

      {footer && (
        <div className={`rounded-b p-4 ${footerSchemeClassName}`}>{footer}</div>
      )}
    </div>
  );
};

export interface CardContentProps {
  children: React.ReactNode;
}
export const CardContent = ({ children }: CardContentProps) => {
  return <div className="p-4">{children}</div>;
};
