import { HTMLAttributes } from "react";

import { Spinner } from "../Spinner";
import { Tooltip } from "../Tooltip/Tooltip";

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  icon: React.ReactNode;
  tooltip: React.ReactNode;
  form?: string;
  type?: "button" | "submit" | "reset";
  value?: string;
  name?: string;
}

export const IconButton = ({
  isLoading,
  loadingText,
  icon,
  tooltip,
  ...props
}: IconButtonProps) => {
  return (
    <Tooltip tooltip={tooltip}>
      <button
        className="rounded bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 w-6 h-8 flex items-center justify-center"
        aria-disabled={isLoading}
        aria-label={isLoading ? loadingText : undefined}
        {...props}
      >
        {isLoading ? <Spinner /> : icon}
      </button>
    </Tooltip>
  );
};
