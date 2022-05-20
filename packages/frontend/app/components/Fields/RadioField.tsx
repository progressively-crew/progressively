import { RadioGroup, Radio } from "@chakra-ui/react";

export interface RadioFieldOption<T> {
  label: string;
  value: T;
}

export interface RadioFieldProps<T> {
  name: string;
  value: string | number;
  onChange: (nextValue: T) => void;
  options: Array<RadioFieldOption<T>>;
}

export const RadioField = <T extends string>({
  name,
  value,
  onChange,
  options,
}: RadioFieldProps<T>) => {
  return (
    <RadioGroup value={value} onChange={onChange}>
      {options.map((opt) => (
        <Radio
          key={opt.value}
          id={opt.value}
          name={name}
          value={opt.value}
          size="lg"
          h={12}
        >
          {opt.label}
        </Radio>
      ))}
    </RadioGroup>
  );
};
