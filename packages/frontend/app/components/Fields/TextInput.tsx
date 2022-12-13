import { Stack } from "../Stack";
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
}

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
  ...props
}: TextInputProps) => {
  let ariaDescription: string | undefined;

  const currentId = id || name;

  if (isInvalid) {
    ariaDescription = `error-${currentId}`;
  } else if (description) {
    ariaDescription = `${currentId}-hint`;
  }

  let inputClasses = isInvalid
    ? "h-10 rounded px-4 border border-red-500 dark:text-black"
    : "h-10 rounded px-4 border border-gray-200 dark:text-black";

  if (isDisabled) {
    inputClasses += " border-gray-300 text-gray-600 bg-gray-50";
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

      <input
        type={type}
        name={name}
        id={currentId}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-describedby={ariaDescription}
        aria-disabled={isDisabled}
        readOnly={isDisabled}
        className={inputClasses}
        {...props}
      />

      {description && <p id={`${currentId}-hint`}>{description}</p>}
    </Stack>
  );
};
