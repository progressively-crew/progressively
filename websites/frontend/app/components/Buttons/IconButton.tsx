import { HTMLAttributes } from "react";

import { Spinner } from "../Spinner";
import { Tooltip } from "../Tooltip/Tooltip";

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  icon: React.ReactNode;
  tooltip: string;
  form?: string;
  type?: "button" | "submit" | "reset";
  value?: string;
  name?: string;
  variant?: "inverse" | "default";
  size?: "M" | "L";
}

const variantStyles = {
  inverse: "text-white bg-transparent hover:bg-slate-700",
  default:
    "hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100",
};

const sizeStyles = {
  L: "px-4 h-10",
  M: "w-6 h-8",
};

export const IconButton = ({
  isLoading,
  loadingText,
  icon,
  tooltip,
  variant = "default",
  size = "M",
  ...props
}: IconButtonProps) => {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <Tooltip tooltip={tooltip}>
      <button
        className={`rounded bg-transparent flex items-center justify-center ${variantStyle} ${sizeStyle}`}
        aria-disabled={isLoading}
        aria-label={isLoading ? loadingText : tooltip}
        {...props}
      >
        {isLoading ? <Spinner /> : icon}
      </button>
    </Tooltip>
  );
};
