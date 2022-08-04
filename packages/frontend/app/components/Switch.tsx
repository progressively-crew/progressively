import { Typography } from "./Typography";

export interface SwitchProps {
  checked: boolean;
  type?: "reset" | "submit" | "button";
  onClick?: () => void;
  label: string;
}

export const Switch = ({
  checked,
  type = "submit",
  onClick,
  label,
}: SwitchProps) => {
  return (
    <button
      aria-checked={checked}
      type={type}
      role="switch"
      aria-label={label}
      onClick={onClick}
    >
      <Typography>Off</Typography>
      <span>
        <span aria-hidden />
      </span>
      <Typography>On</Typography>
    </button>
  );
};
