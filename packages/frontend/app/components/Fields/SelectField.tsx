import { HTMLAttributes, useId } from "react";
import { Stack } from "../Stack";
import { Label } from "./Label";

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectFieldProps extends HTMLAttributes<HTMLSelectElement> {
  isInvalid?: boolean;
  name: string;
  defaultValue?: string;
  label: string;
  options: Array<SelectOption>;
  hiddenLabel?: boolean;
  className?: string;
}

export const SelectField = ({
  isInvalid,
  name,
  defaultValue,
  label,
  options,
  hiddenLabel,
  className,
  ...props
}: SelectFieldProps) => {
  const id = useId();
  const inputClasses = isInvalid
    ? "h-10 rounded px-4 border border-red-500 dark:text-slate-100 dark:bg-slate-700"
    : "h-10 rounded px-4 border border-gray-200 bg-white dark:border-slate-700 dark:text-slate-100 dark:bg-slate-700";

  return (
    <Stack spacing={2}>
      <Label htmlFor={id} className={hiddenLabel ? "sr-only" : undefined}>
        {label}
      </Label>

      <div className={`${inputClasses} ${className || ""}`}>
        <div className="flex flex-row gap-2 h-full items-center">
          <select
            name={name}
            id={id}
            defaultValue={defaultValue}
            aria-describedby={isInvalid ? `error-${name}` : undefined}
            className={`w-full h-full bg-transparent text-gray-600 dark:text-slate-100 px-2`}
            {...props}
          >
            {options.map((opt) => (
              <option key={`${name}-${opt.value}`} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Stack>
  );
};
