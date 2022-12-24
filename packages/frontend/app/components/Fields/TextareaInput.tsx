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
  const inputClasses = isInvalid
    ? "h-20 rounded px-4 border border-red-500 dark:text-slate-100 dark:bg-slate-700"
    : "h-20 rounded px-4 border border-gray-200 bg-white dark:border-slate-700 dark:text-slate-100 dark:bg-slate-700";

  return (
    <Stack spacing={2}>
      <Label htmlFor={name}>{label}</Label>

      <textarea
        name={name}
        id={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-describedby={isInvalid ? `error-${name}` : undefined}
        className={inputClasses}
      />
    </Stack>
  );
};
