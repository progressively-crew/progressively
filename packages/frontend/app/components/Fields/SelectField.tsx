import { styled } from "~/stitches.config";
import { Stack } from "../Stack";
import { Label } from "./Label";

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectFieldProps {
  isInvalid?: boolean;
  name: string;
  defaultValue?: string;
  label: string;
  options: Array<SelectOption>;
}

const Select = styled("select", {
  appearance: "none",
  border: "2px solid $hermes",
  borderRadius: "$borderRadius$regular",
  fontSize: "$uranus",
  padding: "0 $spacing$4",
  height: "$cta",
  display: "block",
  boxSizing: "border-box",
  background: "$apollo",
  maxWidth: "40ch",
});

export const SelectField = ({
  isInvalid,
  name,
  defaultValue,
  label,
  options,
}: SelectFieldProps) => {
  return (
    <Stack spacing={2}>
      <Label htmlFor={name}>{label}</Label>

      <Select
        name={name}
        id={name}
        defaultValue={defaultValue}
        aria-describedby={isInvalid ? `error-${name}` : undefined}
      >
        {options.map((opt) => (
          <option key={`${name}-${opt.value}`} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
    </Stack>
  );
};
