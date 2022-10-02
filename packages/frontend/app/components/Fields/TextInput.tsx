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
  id?: string;
  isDisabled?: boolean;
  small?: boolean;
}

const Input = styled("input", {
  border: "1px solid $border",
  borderRadius: "$borderRadius$regular",
  fontSize: "$uranus",
  fontFamily: "$default",
  padding: "0 $spacing$4",
  height: "$cta",
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  maxWidth: "40ch",
  variants: {
    invalid: {
      true: {
        border: "2px solid $errorBorder",
      },
    },

    small: {
      true: {
        height: "$ctaSmall",
      },
    },
    isDisabled: {
      true: {
        border: "2px solid $heracles",
        background: "$hera",
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
  id,
  isDisabled,
  small,
  ...props
}: TextInputProps) => {
  let ariaDescription: string | undefined;

  const currentId = id || name;

  if (isInvalid) {
    ariaDescription = `error-${currentId}`;
  } else if (description) {
    ariaDescription = `${currentId}-hint`;
  }

  return (
    <Stack spacing={2}>
      {hiddenLabel ? (
        <VisuallyHidden>
          <label htmlFor={currentId}>{label}</label>
        </VisuallyHidden>
      ) : (
        <Label htmlFor={currentId}>{label}</Label>
      )}

      <Input
        type={type}
        name={name}
        id={currentId}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-describedby={ariaDescription}
        invalid={isInvalid}
        isDisabled={isDisabled}
        aria-disabled={isDisabled}
        readOnly={isDisabled}
        small={small}
        {...props}
      />

      {description && (
        <Hint id={`${currentId}-hint`} invalid={isInvalid}>
          {description}
        </Hint>
      )}
    </Stack>
  );
};
