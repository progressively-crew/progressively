import { HTMLAttributes } from "react";
import { BsCheck } from "react-icons/bs";
import { Typography } from "./Typography";

export interface SwitchProps extends HTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  type?: "reset" | "submit" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  onLabel?: string;
  offLabel?: string;
  form?: string;
}

export const Switch = ({
  checked,
  type = "submit",
  onClick,
  label,
  onLabel,
  offLabel,
  form,
  ...props
}: SwitchProps) => {
  const thumnailCheckedClasses = checked
    ? "translate-x-full text-emerald-200"
    : "";

  const wrapperCheckedClasses = checked
    ? "bg-emerald-300"
    : "bg-gray-300 dark:bg-slate-600";

  const thumnailTransitionClasses = checked ? "group-active:-ml-4" : "";

  const focusStyles =
    "group-focus-within:outline-none group-focus-within:ring-2 group-focus-within:ring-slate-400 group-focus-within:ring-offset-2 dark:group-focus-within:ring-offset-slate-900";

  return (
    <button
      aria-checked={checked}
      type={type}
      role="switch"
      aria-label={label}
      onClick={onClick}
      form={form}
      className="h-6 px-1 flex items-center gap-2 group outline-none"
      {...props}
    >
      <Typography as="span" className="text-sm">
        {offLabel || "Off"}
      </Typography>
      <span
        className={
          "h-7 w-12 rounded-full inline-block p-1 " +
          wrapperCheckedClasses +
          " " +
          focusStyles
        }
      >
        <span
          aria-hidden
          className={
            "transition-all ease-in-out duration-100 w-5 h-full bg-white block rounded-full group-active:w-7 flex items-center justify-center text-md " +
            thumnailCheckedClasses +
            " " +
            thumnailTransitionClasses
          }
        >
          <BsCheck
            aria-hidden
            className={`transition-all ${checked ? "opacity-1" : "opacity-0"}`}
          />
        </span>
      </span>
      <Typography as="span" className="text-sm">
        {onLabel || "On"}
      </Typography>
    </button>
  );
};
