import { useId } from "react";
import { Stack } from "~/components/Stack";
import { Label } from "../Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./RawSelect";

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectFieldProps {
  label: string;
  options: Array<SelectOption>;
  defaultValue?: string;
  value?: string;
  hiddenLabel?: boolean;
  name: string;
  onValueChange?: (next: string) => void;
}

export const SelectField = ({
  label,
  options,
  defaultValue,
  value,
  hiddenLabel,
  name,
  onValueChange,
}: SelectFieldProps) => {
  const id = useId();

  return (
    <Stack spacing={2}>
      <Label
        htmlFor={id}
        className={hiddenLabel ? "sr-only" : undefined}
        aria-hidden
      >
        {label}
      </Label>

      <Select
        defaultValue={defaultValue}
        name={name}
        onValueChange={onValueChange}
        value={value}
      >
        <SelectTrigger id={id} aria-label={label}>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={String(opt.value)}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Stack>
  );
};
