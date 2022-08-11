import { styled } from "~/stitches.config";
import { Stack } from "../Stack";
import { Label } from "./Label";

export interface SliderInputProps {
  percentageValue: number;
  name: string;
  label: string;
  onChange: (nextValue: number) => void;
}

const RangeInput = styled("input", {
  "-webkit-appearance": "none",
  appearance: "none",
  background: "transparent",
  cursor: "pointer",
  width: "15rem",

  // chrome edge safari
  "&::-webkit-slider-runnable-track": {
    background: "#053a5f",
    height: "0.5rem",
  },

  "&::-webkit-slider-thumb": {
    "-webkit-appearance": "none",
    appearance: "none",
    marginTop: "-12px",
    backgroundColor: " #5cd5eb",
    height: "2rem",
    width: "1rem",
  },

  // firefox
  "&::-moz-range-track": {
    background: "#053a5f",
    height: "0.5rem",
  },

  "&::-moz-range-thumb": {
    border: "none",
    borderRadius: 0,
    backgroundColor: "#5cd5eb",
    height: "2rem",
    width: "1rem",
  },
});

export const SliderInput = ({
  percentageValue,
  name,
  label,
  onChange,
}: SliderInputProps) => {
  return (
    <Stack spacing={2}>
      <Label htmlFor={`field-${name}`}>{label}</Label>

      <RangeInput
        type="range"
        min={0}
        max={100}
        step={1}
        value={percentageValue}
        id={`field-${name}`}
        name={name}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </Stack>
  );
};
