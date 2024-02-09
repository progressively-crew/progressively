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

      <div className="inline-block h-10 flex flex-row items-center gap-2">
        <div className="relative flex flex-row items-center">
          <div className="w-full absolute h-2 bg-slate-200 rounded-full" />
          <div
            className="h-2 bg-slate-700 absolute rounded-full"
            style={{ width: `${value}%` }}
          />
          <input
            type="range"
            id={id}
            name={name}
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="relative z-10"
          />
        </div>

        <span
          className="bg-slate-700 text-white rounded flex justify-center items-center w-[36px] text-sm py-1 text-xs font-semibold font-mono"
          aria-hidden
        >
          {value}%
        </span>
      </div>
    </div>
  );
};
