import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

const RawSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>((props, ref) => (
  <SwitchPrimitives.Root
    className={
      "peer inline-flex items-center h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-gray-200 data-[state=checked]:bg-emerald-300"
    }
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-5"
      }
    />
  </SwitchPrimitives.Root>
));

RawSwitch.displayName = SwitchPrimitives.Root.displayName;

export { RawSwitch };
