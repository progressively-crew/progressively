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
      <Typography as="div" id={id} className="font-semibold pb-2">
        {label}
      </Typography>

      <div className="flex flex-row gap-2 items-center">
        <div role="progressbar" aria-labelledby={id} aria-valuenow={value}>
          <div className="relative h-6 overflow-hidden rounded bg-gradient-to-r from-green-500 to-red-500 w-[300px]">
            <div
              className="h-full bg-gray-200 absolute right-0"
              style={{
                width: `${percentageWidth}%`,
              }}
            />
          </div>
        </div>
        <Typography as="div" className="" aria-hidden>
          <strong>
            {value} / {max}
          </strong>{" "}
          flag evaluations.
        </Typography>
      </div>
    </div>
  );
};
