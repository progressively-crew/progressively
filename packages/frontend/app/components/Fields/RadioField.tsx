import { Stack } from "../Stack";
import { Label } from "./Label";

export interface RadioFieldOption<T> {
  label: string;
  value: T;
}

export interface RadioFieldProps<T> {
  name: string;
  value: string | number;
  onChange: (nextValue: T) => void;
  options: Array<RadioFieldOption<T>>;
  title: string;
}

export const RadioField = <T extends string>({
  name,
  value,
  onChange,
  options,
  title,
}: RadioFieldProps<T>) => {
  return (
    <Stack as="fieldset">
      <Label as="legend">{title}</Label>
      <Stack>
        {options.map((opt) => (
          <div key={opt.value}>
            <input
              type="radio"
              id={opt.value}
              name={name}
              value={opt.value}
              checked={opt.value === value}
              onChange={(e) => onChange(e.target.value as T)}
            />
            <Label htmlFor={opt.value}>{opt.label}</Label>
          </div>
        ))}
      </Stack>
    </Stack>
  );
};
