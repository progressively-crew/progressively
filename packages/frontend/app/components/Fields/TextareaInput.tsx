import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

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
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea
        name={name}
        id={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-describedby={isInvalid ? `error-${name}` : undefined}
      />
    </FormControl>
  );
};
