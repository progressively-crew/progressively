import { useEffect, useId, useRef, useState } from "react";
import { RawSwitch } from "./RawSwitch";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

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
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <div className="flex flex-row items-center gap-2 justify-between">
      <label htmlFor={id} className="font-extrabold">
        {label}
      </label>

      <div className="relative flex flex-row items-center" ref={ref}>
        <div className="relative z-10 flex flex-row items-center">
          <RawSwitch
            id={id}
            checked={isChecked}
            type={type}
            form={form}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setIsChecked((s) => !s);
              onClick?.(e);
            }}
          />
        </div>
        {isVisible && (
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"
            style={{ animationIterationCount: 5 }}
          ></span>
        )}
      </div>
    </div>
  );
};
