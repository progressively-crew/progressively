export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectFieldProps {
  isInvalid?: boolean;
  name: string;
  defaultValue?: string;
  label: string;
  options: Array<SelectOption>;
}

export const SelectField = ({
  isInvalid,
  name,
  defaultValue,
  label,
  options,
}: SelectFieldProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>

      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        aria-describedby={isInvalid ? `error-${name}` : undefined}
      >
        {options.map((opt) => (
          <option key={`${name}-${opt.value}`} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
