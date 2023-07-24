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
          type="number"
          id="percentage"
          min={0}
          max={100}
          className="bg-gray-100 h-10 rounded-l p-2"
          value={value}
          onChange={(e) => {
            onChange(Number(e.target.value));
          }}
        />
        <span className="p-2 h-10 rounded-r bg-gray-200 font-mono w-10 font-extrabold text-center text-xl">
          %
        </span>
      </div>
    </div>
  );
};
