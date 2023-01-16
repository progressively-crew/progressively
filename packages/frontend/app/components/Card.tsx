import React from "react";

export interface CardProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card = ({ children, footer }: CardProps) => {
  return (
    <div className="border border-gray-200 rounded-md bg-white dark:border-slate-700 dark:bg-slate-800 overflow-hidden">
      {children}

      {footer && <div className="bg-gray-50 px-6 py-4">{footer}</div>}
    </div>
  );
};

export interface CardContentProps {
  children: React.ReactNode;
}
export const CardContent = ({ children }: CardContentProps) => {
  return <div className="p-6">{children}</div>;
};
