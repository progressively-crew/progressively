import React from "react";

export interface CardProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Card = ({ children, footer, onClick, className }: CardProps) => {
  const clickableClasses = onClick
    ? "hover:border-gray-300 hover:shadow-sm active:bg-gray-50 cursor-pointer transition-all"
    : "";

  return (
    <div
      className={`overflow-hidden h-full border border-gray-200 rounded-2xl bg-white ${clickableClasses} ${
        className || ""
      }`}
      onClick={onClick}
    >
      {children}

      {footer && <div className={`rounded-b p-4 bg-gray-50`}>{footer}</div>}
    </div>
  );
};

export interface CardContentProps {
  children: React.ReactNode;
}
export const CardContent = ({ children }: CardContentProps) => {
  return <div className="p-4">{children}</div>;
};
