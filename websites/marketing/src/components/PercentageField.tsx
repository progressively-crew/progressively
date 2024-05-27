import { useId, useState } from "react";

export interface PercentageFieldProps {
  value: number;
  label: string;
  onChange: (next: number) => void;
}

export const PercentageField = ({
  label,
  value,
  onChange,
}: PercentageFieldProps) => {
  const id = useId();

  return (
    <div className="flex flex-row gap-2 items-center">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <div className="w-full relative flex flex-row items-center">
        <div className="w-full absolute h-2 bg-slate-200 rounded-full" />
        <div
          className="h-2 bg-slate-700 absolute rounded-full"
          style={{ width: `${value}%` }}
        />
        <input
          type="range"
          id={id}
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative z-10"
        />
      </div>
    </div>
  );
};
