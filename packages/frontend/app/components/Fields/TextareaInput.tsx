import { Stack } from "../Stack";
import { Label } from "./Label";

export interface TextareaInputProps {
  isInvalid?: boolean;
  name: string;
  defaultValue?: string;
  label: string;
  placeholder?: string;
}

export const TextareaInput = ({
  isInvalid,
  name,
  defaultValue,
  label,
  placeholder,
}: TextareaInputProps) => {
  return (
    <Stack spacing={2}>
      <Label htmlFor={name}>{label}</Label>

      <textarea
        name={name}
        id={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-describedby={isInvalid ? `error-${name}` : undefined}
      />
    </Stack>
  );
};
