import { useEffect, useId, useState } from "react";
import { RawSwitch } from "./RawSwitch";

export interface SwitchProps {
  label?: string;
  checked: boolean;
  form?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
}

export const Switch = ({
  label,
  checked,
  form,
  onClick,
  type = "submit",
}: SwitchProps) => {
  const id = useId();
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-slate-900 text-sm" aria-hidden>
        {label}
      </label>
      <RawSwitch
        id={id}
        checked={isChecked}
        type={type}
        aria-label={label}
        form={form}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          setIsChecked((s) => !s);
          onClick?.(e);
        }}
      />
    </div>
  );
};
