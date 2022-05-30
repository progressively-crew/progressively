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
}

export const RadioField = <T extends string>({
  name,
  value,
  onChange,
  options,
}: RadioFieldProps<T>) => {
  return (
    <fieldset>
      {/* <legend>Select a maintenance drone:</legend> */}
      {options.map((opt) => (
        <div key={opt.value}>
          <Label htmlFor={opt.value}>{opt.label}</Label>
          <input
            type="radio"
            id={opt.value}
            name={name}
            value={opt.value}
            checked={opt.value === value}
            onChange={(e) => onChange(e.target.value as T)}
          ></input>
        </div>
      ))}
    </fieldset>
  );
};
