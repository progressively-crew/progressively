import { Stack } from "../Stack";
import { Label } from "./Label";

export interface SliderInputProps {
  percentageValue: number;
  name: string;
  label: string;
  onChange: (nextValue: number) => void;
}

export const SliderInput = ({
  percentageValue,
  name,
  label,
  onChange,
}: SliderInputProps) => {
  return (
    <Stack spacing={2}>
      <Label htmlFor={`field-${name}`}>{label}</Label>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={percentageValue}
        name={`field-${name}`}
        id={`field-${name}`}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </Stack>
  );
};
