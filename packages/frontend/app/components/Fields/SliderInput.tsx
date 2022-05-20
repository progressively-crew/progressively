export interface SliderInputProps {
  percentageValue: number;
  name: string;
  label: string;
  onChange: (nextValue: number) => void;
}

export const SliderInput = ({
  percentageValue,
  name,
  label,
  onChange,
}: SliderInputProps) => {
  return (
    <div>
      <label htmlFor={`field-${name}`}>{label}</label>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={percentageValue}
        name={`field-${name}`}
        id={`field-${name}`}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};
