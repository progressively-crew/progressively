import { useId } from "react";

export interface PercentageFieldProps {
  name: string;
  initialValue: number;
  label: string;
  hiddenLabel?: boolean;
}

export const PercentageField = ({
  name,
  initialValue,
  label,
  hiddenLabel,
}: PercentageFieldProps) => {
  const id = useId();

  return (
    <div>
      <label className={hiddenLabel ? "sr-only" : ""}>{label}</label>
      <div className="border border-gray-200 dark:border-slate-800 dark:text-slate-100 dark:bg-slate-700 h-10 rounded flex flex-row focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-400 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-900">
        <input
          type="number"
          id={id}
          name={name}
          min="0"
          max="100"
          defaultValue={initialValue}
          className="h-full px-4 w-20 pr-2 bg-transparent rounded-l outline-none"
        />
        <div
          className="bg-gray-100 rounded-r h-full flex items-center px-2"
          aria-hidden
        >
          %
        </div>
      </div>
    </div>
  );
};
