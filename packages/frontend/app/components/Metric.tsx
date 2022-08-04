import { Spacer } from "./Spacer";
import { Typography } from "./Typography";
import { VisuallyHidden } from "./VisuallyHidden";

export interface MetricProps {
  value: number | string;
  label: string;
  unit: string;
}

export const Metric = ({ label, unit, value }: MetricProps) => {
  return (
    <div>
      <VisuallyHidden>{`${label} ${value} ${unit}`}</VisuallyHidden>

      <div aria-hidden>
        <span>
          {value} <span>{unit}</span>
        </span>
      </div>

      <Spacer size={1} />

      <Typography aria-hidden>{label}</Typography>
    </div>
  );
};
