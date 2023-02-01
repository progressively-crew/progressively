import { useId } from "react";
import { Label } from "./Label";
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

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor={id}>{label}</Label>
      <RawSwitch
        id={id}
        defaultChecked={checked}
        type={type}
        form={form}
        onClick={onClick}
      />
    </div>
  );
};
