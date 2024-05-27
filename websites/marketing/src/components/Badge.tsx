import type { ReactNode } from "react";

const badgeClass = {
  indigo: "bg-indigo-100 text-indigo-500 text-lg",
  emerald: "bg-emerald-100 text-emerald-500 text-lg",
  pink: "bg-pink-100 text-pink-500 text-lg",
};

export interface BadgeProps {
  scheme: "indigo" | "emerald" | "pink";
  children: ReactNode;
}

export const Badge = ({ children, scheme }: BadgeProps) => {
  const className = badgeClass[scheme];

  return (
    <div className={`${className} px-4 py-2 rounded-full inline`}>
      {children}
    </div>
  );
};
