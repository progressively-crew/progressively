import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Typography } from "../Typography";

export interface TextInputProps {
  isInvalid?: boolean;
  name: string;
  defaultValue?: string;
  label: string;
  placeholder?: string;
  type?: string;
  description?: string;
}

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
    <FormControl isInvalid={Boolean(isInvalid)}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-describedby={ariaDescription}
      />

      {description && (
        <Typography fontSize="sm" color="textlight" id={`${name}-hint`}>
          {description}
        </Typography>
      )}
    </FormControl>
  );
};
