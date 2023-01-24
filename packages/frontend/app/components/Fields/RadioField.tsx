import { HStack } from "../HStack";
import { Spacer } from "../Spacer";
import { Label } from "./Label";
import { Radio } from "./Radio";

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
  hiddenTitle?: boolean;
}

export const RadioField = <T extends string>({
  name,
  value,
  onChange,
  options,
  title,
  hiddenTitle,
}: RadioFieldProps<T>) => {
  return (
    <fieldset>
      <Label as="legend" className={hiddenTitle ? "sr-only" : undefined}>
        {title}
      </Label>
      <Spacer size={2} />
      <HStack spacing={2}>
        {options.map((opt) => (
          <HStack key={opt.value} spacing={2}>
            <Radio
              id={opt.value}
              name={name}
              value={opt.value}
              checked={opt.value === value}
              onChange={(e) => onChange(e.target.value as T)}
            />
            <Label htmlFor={opt.value}>{opt.label}</Label>
          </HStack>
        ))}
      </HStack>
    </fieldset>
  );
};
