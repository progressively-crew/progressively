import { forwardRef, HTMLAttributes } from "react";

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  checked: boolean;
  value: string;
  name: string;
  disabled?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, disabled, ...props }, ref) => (
    <input
      ref={ref}
      aria-disabled={disabled}
      type="checkbox"
      checked={checked}
      {...props}
    />
  )
);

Checkbox.displayName = "ForwardedCheckbox";
