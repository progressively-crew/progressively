import { styled } from "~/stitches.config";
import { Stack } from "../Stack";
import { Typography } from "../Typography";
import { VisuallyHidden } from "../VisuallyHidden";
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
  hiddenLabel?: boolean;
}

const Input = styled("input", {
  border: "4px solid $hermes",
  borderRadius: "$borderRadius$regular",
  fontSize: "$jupiter",
  padding: "$spacing$2 $spacing$4",
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  maxWidth: "40ch",
  variants: {
    invalid: {
      true: {
        border: "4px solid $errorBorder",
      },
    },
  },
});

const Hint = styled(Typography, {
  fontSize: "$uranus",
  variants: {
    invalid: {
      true: {
        color: "$errorFg",
      },
    },
  },
});

export const TextInput = ({
  isInvalid,
  name,
  defaultValue,
  label,
  placeholder,
  type = "text",
  description,
  hiddenLabel,
  ...props
}: TextInputProps) => {
  let ariaDescription: string | undefined;

  if (isInvalid) {
    ariaDescription = `error-${name}`;
  } else if (description) {
    ariaDescription = `${name}-hint`;
  }

  return (
    <Stack spacing={2}>
      {hiddenLabel ? (
        <VisuallyHidden>
          <label htmlFor={name}>{label}</label>
        </VisuallyHidden>
      ) : (
        <Label htmlFor={name}>{label}</Label>
      )}

      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-describedby={ariaDescription}
        invalid={isInvalid}
        {...props}
      />

      {description && (
        <Hint id={`${name}-hint`} invalid={isInvalid}>
          {description}
        </Hint>
      )}
    </Stack>
  );
};
