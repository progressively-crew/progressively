import type { ReactNode } from "react";

const variantStyles = {
  success: "bg-gradient-to-b from-emerald-100 to-emerald-50",
  default: "bg-white",
  dark: "bg-gray-800",
};

export interface CardProps {
  children: ReactNode;
  variant?: "success" | "default" | "dark";
}

export const Card = ({ variant, children }: CardProps) => {
  const sharedStyles =
    "shrink-0 rounded-3xl border border-gray-100 w-[320px] md:w-[460px]";
  const styles = `${sharedStyles} ${variantStyles[variant || "default"]}`;

  return <article className={styles}>{children}</article>;
};
