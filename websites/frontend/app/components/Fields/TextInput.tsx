import { HTMLAttributes, forwardRef, useId } from "react";
import { Stack } from "../Stack";
import { VisuallyHidden } from "../VisuallyHidden";
import { Label } from "./Label";

export interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
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
  className?: string;
}

export const TextInput = forwardRef(
  (
    {
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
      className,
      ...props
    }: TextInputProps,
    ref
  ) => {
    const localId = useId();
    let ariaDescription: string | undefined;

    const currentId = id || localId;

    if (isInvalid) {
      ariaDescription = `error-${currentId}`;
    } else if (description) {
      ariaDescription = `${currentId}-hint`;
    }

    let inputClasses = isInvalid
      ? "h-10 rounded-xl px-4 border border-red-500 text-sm"
      : "h-10 rounded-xl px-4 border border-gray-200 text-sm";

    if (isDisabled) {
      inputClasses += " border-gray-300 text-gray-600 bg-gray-50";
    }

    if (className) {
      inputClasses += ` ${className}`;
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
          ref={ref}
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
  }
);

TextInput.displayName = "TextInput";
