import React from "react";

export interface CardProps {
  children: React.ReactNode;
}

export const SimpleCard = ({ children }: CardProps) => {
  return (
    <div className="border border-gray-200 rounded bg-white">{children}</div>
  );
};

export interface CardContentProps {
  children: React.ReactNode;
}
export const CardContent = ({ children }: CardContentProps) => {
  return <div className="p-8">{children}</div>;
};
