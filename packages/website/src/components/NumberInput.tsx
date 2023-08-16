export interface NumberInputProps {
  onChange: (n: number) => void;
  value: number;
}

export const NumberInput = ({ onChange, value }: NumberInputProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <label htmlFor="percentage" className="font-extrabold">
        Percentage of the audience
      </label>
      <div className="flex flex-row">
        <input
          type="range"
          id="percentage"
          min={0}
          max={100}
          className="bg-gray-100 h-10 rounded-l p-2"
          value={value}
          onChange={(e) => {
            onChange(Number(e.target.value));
          }}
        />
        <span className="p-2 h-10 rounded bg-slate-200 text-slate-700 font-mono w-14 text-center">
          {value}%
        </span>
      </div>
    </div>
  );
};
