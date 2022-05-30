import * as SwitchPrimitive from "@radix-ui/react-switch";
import { useState } from "react";
import { styled } from "~/stitches.config";

const StyledSwitch = styled(SwitchPrimitive.Root, {
  all: "unset",
  width: 42,
  height: 25,
  backgroundColor: "$background",
  borderRadius: "9999px",
  position: "relative",
  boxShadow: `0 2px 10px $primary`,
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  "&:focus": { outline: `revert` },
  '&[data-state="checked"]': { backgroundColor: "$primary" },
  cursor: "pointer",

  padding: "$spacing$1 $spacing$2",
  border: "1px solid $border",
});

const StyledThumb = styled(SwitchPrimitive.Thumb, {
  display: "block",
  width: 21,
  height: 21,
  backgroundColor: "white",
  borderRadius: "9999px",
  boxShadow: `0 2px 2px $primary`,
  transition: "transform 100ms",
  transform: "translateX(2px)",
  willChange: "transform",
  '&[data-state="checked"]': { transform: "translateX(19px)" },
});

const Text = styled("span", {
  fontSize: "$btn",
  color: "$hover",
  fontFamily: "$default",
});

const SwitchWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$spacing$2",
});

export interface SwitchProps {
  checked: boolean;
}

export const Switch = ({ checked }: SwitchProps) => {
  const [internalChecked, setInternalChecked] = useState(checked);

  return (
    <SwitchWrapper>
      <Text>Off</Text>
      <StyledSwitch
        checked={internalChecked}
        type="submit"
        aria-label="Feature flag activation"
        onClick={() => setInternalChecked((s) => !s)}
      >
        <StyledThumb />
      </StyledSwitch>
      <Text>On</Text>
    </SwitchWrapper>
  );
};
