import { useEffect, useState } from "react";
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
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <RawSwitch
      checked={isChecked}
      type={type}
      aria-label={label}
      form={form}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        setIsChecked((s) => !s);
        onClick?.(e);
      }}
    />
  );
};
