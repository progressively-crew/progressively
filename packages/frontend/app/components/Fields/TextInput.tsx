import { styled } from "~/stitches.config";
import { Stack } from "../Stack";
import { Typography } from "../Typography";
import { Label } from "./Label";

export interface TextInputProps {
  isInvalid?: boolean;
  name: string;
  defaultValue?: string;
  label: string;
  placeholder?: string;
  type?: string;
  description?: string;
}

const Input = styled("input", {
  border: "4px solid $hover",
  borderRadius: "$borderRadius$regular",
  fontSize: "$content",
  padding: "$spacing$2 $spacing$4",
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  maxWidth: "40ch",
});

const Hint = styled(Typography, {
  fontSize: "$btn",
});

export const TextInput = ({
  isInvalid,
  name,
  defaultValue,
  label,
  placeholder,
  type = "text",
  description,
}: TextInputProps) => {
  let ariaDescription: string | undefined;

  if (isInvalid) {
    ariaDescription = `error-${name}`;
  } else if (description) {
    ariaDescription = `${name}-hint`;
  }

  return (
    <Stack spacing={2}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-describedby={ariaDescription}
      />

      {description && <Hint id={`${name}-hint`}>{description}</Hint>}
    </Stack>
  );
};
