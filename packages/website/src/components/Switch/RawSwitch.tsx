import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

const RawSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>((props, ref) => (
  <SwitchPrimitives.Root
    className={
      "peer inline-flex items-center h-[48px] w-[88px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-slate-200 data-[state=checked]:bg-emerald-300 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=unchecked]:bg-slate-700"
    }
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={
        "pointer-events-none block h-8 w-8 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-2 data-[state=checked]:translate-x-10"
      }
    />
  </SwitchPrimitives.Root>
));

RawSwitch.displayName = SwitchPrimitives.Root.displayName;

export { RawSwitch };
