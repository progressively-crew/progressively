import { styled } from "~/stitches.config";
import { Stack } from "../Stack";
import { Label } from "./Label";

export interface TextareaInputProps {
  isInvalid?: boolean;
  name: string;
  defaultValue?: string;
  label: string;
  placeholder?: string;
}

const Textarea = styled("textarea", {
  border: "4px solid $hover",
  borderRadius: "$borderRadius$regular",
  fontSize: "$content",
  padding: "$spacing$2 $spacing$4",
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  minHeight: "200px",
});

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

      <Textarea
        name={name}
        id={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-describedby={isInvalid ? `error-${name}` : undefined}
      />
    </Stack>
  );
};
