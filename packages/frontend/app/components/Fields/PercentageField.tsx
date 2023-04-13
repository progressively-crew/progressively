import { useId } from "react";
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

      <div className="overflow-hidden inline-block w-28 border border-gray-200 dark:border-slate-800 dark:text-slate-100 dark:bg-slate-700 h-10 rounded flex flex-row focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-400 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-900">
        <input
          type="number"
          id={id}
          name={name}
          min="0"
          max="100"
          defaultValue={initialValue}
          className="h-full px-4 w-20 pr-2 bg-transparent rounded-l outline-none"
        />
        <Typography
          as="span"
          className="bg-slate-100 dark:bg-slate-600 rounded-r h-full flex items-center px-2 w-8"
          aria-hidden
        >
          %
        </Typography>
      </div>
    </div>
  );
};
