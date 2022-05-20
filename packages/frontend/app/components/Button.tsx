import { HTMLAttributes } from "react";
import { Link } from "./Link";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  to?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  to,
  children,
  type,
  isLoading,
  loadingText,
  ...props
}: ButtonProps) => {
  if (to) {
    return <Link to={to}>{children}</Link>;
  }

  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
};
