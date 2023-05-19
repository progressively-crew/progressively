import { useId } from "react";
import { Typography } from "./Typography";

export interface ProgressProps {
  max: number;
  value: number;
  label: string;
}

export const Progress = ({ max, value, label }: ProgressProps) => {
  const id = useId();

  const remaining = max - value;
  const percentageWidth = (remaining / max) * 100;

  return (
    <div>
      <Typography as="div" id={id} className="sr-only">
        {label}
      </Typography>

      <div className="flex flex-row gap-2 items-center">
        <div role="progressbar" aria-labelledby={id} aria-valuenow={value}>
          <div className="relative h-4 overflow-hidden rounded bg-gradient-to-r from-green-400 to-red-400 w-[100px]">
            <div
              className="h-full bg-gray-200 dark:bg-slate-800 absolute right-0"
              style={{
                width: `${percentageWidth}%`,
              }}
            />
          </div>
        </div>
        <Typography as="div" className="text-xs" aria-hidden>
          <strong>
            {value} / {max}
          </strong>{" "}
          flag evaluations.
        </Typography>
      </div>
    </div>
  );
};
