import { forwardRef, HTMLAttributes } from "react";

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  value: string;
  name: string;
  disabled?: boolean;
  defaultChecked?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, disabled, ...props }, ref) => (
    <input
      ref={ref}
      aria-disabled={disabled}
      type="checkbox"
      checked={checked}
      className={"w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 "}
      {...props}
    />
  )
);

Checkbox.displayName = "ForwardedCheckbox";
