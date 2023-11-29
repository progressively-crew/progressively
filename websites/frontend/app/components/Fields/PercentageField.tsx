import { useId, useState } from "react";
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

  return (
    <div className="flex flex-row gap-2">
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

      <div className="inline-block h-10 flex flex-row items-center focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-400 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-900">
        <input
          type="range"
          id={id}
          name={name}
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />

        <div
          className="
          ml-1
          w-0 h-0 
  border-t-[7px] border-t-transparent
  border-r-[10px] border-r-slate-700 dark:border-r-slate-600
  border-b-[7px] border-b-transparent"
        ></div>
        <Typography
          as="span"
          className="bg-slate-700 text-white dark:bg-slate-600 rounded h-full flex justify-center items-center w-[70px] text-sm font-semibold font-mono"
          aria-hidden
        >
          {value}%
        </Typography>
      </div>
    </div>
  );
};
