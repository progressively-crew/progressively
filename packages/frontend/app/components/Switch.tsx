import { BsCheck } from "react-icons/bs";

export interface SwitchProps {
  checked: boolean;
  type?: "reset" | "submit" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  onLabel?: string;
  offLabel?: string;
  form?: string;
}

export const Switch = ({
  checked,
  type = "submit",
  onClick,
  label,
  onLabel,
  offLabel,
  form,
}: SwitchProps) => {
  const className = checked ? "switch-thumb active" : "switch-thumb";

  return (
    <button
      aria-checked={checked}
      type={type}
      role="switch"
      aria-label={label}
      onClick={onClick}
      form={form}
    >
      <span>{offLabel || "Off"}</span>
      <span>
        <span aria-hidden>{checked && <BsCheck />}</span>
      </span>
      <span>{onLabel || "On"}</span>
    </button>
  );
};
