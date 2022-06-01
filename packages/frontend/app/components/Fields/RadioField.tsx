import { styled } from "~/stitches.config";
import { Stack } from "../Stack";
import { Label } from "./Label";

export interface RadioFieldOption<T> {
  label: string;
  value: T;
}

export interface RadioFieldProps<T> {
  name: string;
  value: string | number;
  onChange: (nextValue: T) => void;
  options: Array<RadioFieldOption<T>>;
  title: string;
}

const RadioItem = styled("div", {
  display: "flex",
  gap: "$spacing$2",
  alignItems: "center",
});

export const RadioField = <T extends string>({
  name,
  value,
  onChange,
  options,
  title,
}: RadioFieldProps<T>) => {
  return (
    <Stack as="fieldset" spacing={2}>
      <Label as="legend">{title}</Label>
      <Stack spacing={2}>
        {options.map((opt) => (
          <RadioItem key={opt.value}>
            <input
              type="radio"
              id={opt.value}
              name={name}
              value={opt.value}
              checked={opt.value === value}
              onChange={(e) => onChange(e.target.value as T)}
            />
            <Label htmlFor={opt.value}>{opt.label}</Label>
          </RadioItem>
        ))}
      </Stack>
    </Stack>
  );
};
