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
  const thumnailCheckedClasses = checked
    ? "translate-x-full text-emerald-200 flex items-center justify-center text-md"
    : "";

  const wrapperCheckedClasses = checked ? "bg-emerald-200" : "bg-gray-300";

  return (
    <button
      aria-checked={checked}
      type={type}
      role="switch"
      aria-label={label}
      onClick={onClick}
      form={form}
      className="h-10 px-1 flex items-center gap-2"
    >
      <span>{offLabel || "Off"}</span>
      <span
        className={
          "h-7 w-12 bg- rounded-full inline-block p-1 " + wrapperCheckedClasses
        }
      >
        <span
          aria-hidden
          className={
            "transition-transform ease-in-out duration-200 w-1/2 h-full bg-white block rounded-full " +
            thumnailCheckedClasses
          }
        >
          {checked && <BsCheck />}
        </span>
      </span>
      <span>{onLabel || "On"}</span>
    </button>
  );
};
