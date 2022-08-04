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
  autoComplete?: "current-password" | "username";
}

export const TextInput = ({
  isInvalid,
  name,
  defaultValue,
  label,
  placeholder,
  type = "text",
  description,
  ...props
}: TextInputProps) => {
  let ariaDescription: string | undefined;

  if (isInvalid) {
    ariaDescription = `error-${name}`;
  } else if (description) {
    ariaDescription = `${name}-hint`;
  }

  return (
    <Stack>
      <Label htmlFor={name}>{label}</Label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-describedby={ariaDescription}
        {...props}
      />

      {description && (
        <Typography id={`${name}-hint`}>{description}</Typography>
      )}
    </Stack>
  );
};
