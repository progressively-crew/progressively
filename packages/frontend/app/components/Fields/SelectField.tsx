import { FormControl, FormLabel, Select } from "@chakra-ui/react";

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

export const SelectField = ({
  isInvalid,
  name,
  defaultValue,
  label,
  options,
}: SelectFieldProps) => {
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>

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
    </FormControl>
  );
};
