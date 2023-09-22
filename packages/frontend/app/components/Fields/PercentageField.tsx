import { useEffect, useId, useState } from "react";
import { VariantDot } from "../../modules/variants/components/VariantDot";
import { Typography } from "../Typography";

export interface PercentageFieldProps {
  name: string;
  initialValue: number;
  label: string;
  hiddenLabel?: boolean;
  hiddenDot?: boolean;
}

export const PercentageField = ({
  name,
  initialValue,
  label,
  hiddenLabel,
  hiddenDot,
}: PercentageFieldProps) => {
  const id = useId();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="flex flex-row gap-2 items-center">
      <Typography
        as="label"
        htmlFor={id}
        className={
          hiddenLabel
            ? "sr-only"
            : "text-sm font-semibold flex flex-row gap-2 items-center"
        }
      >
        {!hiddenDot && <VariantDot variant={label} />}
        {label}
      </Typography>

      <input
        type="range"
        id={id}
        name={name}
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        defaultValue={initialValue}
        className="h-full px-4 w-40 pr-2 bg-transparent rounded-l outline-none"
      />

      <Typography
        as="span"
        className="bg-slate-100 dark:bg-slate-600 rounded h-full flex items-center justify-center px-2 w-16 font-mono"
        aria-hidden
      >
        {value}%
      </Typography>
    </div>
  );
};
