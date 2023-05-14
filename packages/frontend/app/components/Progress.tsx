import { useId } from "react";

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
      <span id={id}>{label}</span>

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
    </div>
  );
};
