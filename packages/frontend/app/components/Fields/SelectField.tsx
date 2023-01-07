import React, { HTMLAttributes, useState } from "react";
import { Stack } from "../Stack";
import { Label } from "./Label";

export interface SelectOption {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export interface SelectFieldProps extends HTMLAttributes<HTMLSelectElement> {
  isInvalid?: boolean;
  name: string;
  defaultValue?: string;
  label: string;
  options: Array<SelectOption>;
  onValueChange?: (str: string) => void;
}

export const SelectField = ({
  isInvalid,
  name,
  defaultValue,
  label,
  options,
  onValueChange,
  ...props
}: SelectFieldProps) => {
  const [selected, setSelected] = useState(options[0]?.value || "");
  const inputClasses = isInvalid
    ? "h-10 rounded px-4 border border-red-500 dark:text-slate-100 dark:bg-slate-700"
    : "h-10 rounded px-4 border border-gray-200 bg-white dark:border-slate-700 dark:text-slate-100 dark:bg-slate-700";

  const icon = options.find((opt) => opt.value === selected);

  return (
    <Stack spacing={2}>
      <Label htmlFor={name}>{label}</Label>

      <div className={inputClasses}>
        <div className="flex flex-row gap-2 h-full items-center">
          {icon?.icon && <span aria-hidden>{icon?.icon}</span>}

          <select
            name={name}
            id={name}
            defaultValue={defaultValue}
            aria-describedby={isInvalid ? `error-${name}` : undefined}
            className="w-full h-full bg-transparent text-gray-600 dark:text-slate-100 px-2"
            onChange={(e) => {
              setSelected(e.target.value);
              onValueChange?.(e.target.value);
            }}
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
