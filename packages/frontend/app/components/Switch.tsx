/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLAttributes, useState } from "react";

import { Typography } from "./Typography";
import { Spinner } from "./Spinner";

export interface SwitchProps extends HTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  type: "button" | "submit";
  optimistic?: boolean;
}

export const Switch = ({ checked, optimistic, ...props }: SwitchProps) => {
  const [internalChecked, setInternalChecked] = useState(checked);

  return (
    <button
      role="switch"
      aria-label="Feature flag activation"
      aria-checked={checked}
      onClick={() => setInternalChecked((s) => !s)}
      {...props}
    >
      <Typography as="span">Off</Typography>
      <div aria-hidden data-is-checked={internalChecked}>
        {optimistic && <Spinner />}
      </div>
      <Typography as="span">On</Typography>
    </button>
  );
};
