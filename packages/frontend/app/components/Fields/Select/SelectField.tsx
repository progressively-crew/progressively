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
  hiddenLabel?: boolean;
  name: string;
  onValueChange?: (next: string) => void;
}

export const SelectField = ({
  label,
  options,
  defaultValue,
  hiddenLabel,
  name,
  onValueChange,
}: SelectFieldProps) => {
  const id = useId();

  return (
    <Stack spacing={2}>
      <Label htmlFor={id} className={hiddenLabel ? "sr-only" : undefined}>
        {label}
      </Label>
      <Select
        defaultValue={defaultValue}
        name={name}
        onValueChange={onValueChange}
      >
        <SelectTrigger id={id}>
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
