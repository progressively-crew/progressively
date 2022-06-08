import { useState } from "react";
import { styled } from "~/stitches.config";

const SwitchButton = styled("button", {
  display: "flex",
  alignItems: "center",
  gap: "$spacing$2",
  height: "$cta",
  backgroundColor: "$background",
  cursor: "pointer",
  border: "none",
  borderRadius: "$borderRadius$regular",
  padding: "0 $spacing$3",
});

const StyledThumb = styled("span", {
  display: "block",
  width: 20,
  height: "100%",
  backgroundColor: "white",
  borderRadius: "9999px",
  boxShadow: `0 2px 2px $primary`,
  transition: "transform 100ms",
  transform: "translateX(0%)",
  willChange: "transform",

  variants: {
    checked: {
      true: {
        transform: "translateX(100%)",
      },
    },
  },
});

const Text = styled("span", {
  fontSize: "$btn",
  color: "$hover",
  fontFamily: "$default",
});

const SwitchInnerWrapper = styled("span", {
  padding: "$spacing$1",
  border: "1px solid $border",
  borderRadius: "9999px",
  width: 40,
  height: 20,

  variants: {
    checked: {
      true: {
        backgroundColor: "$primary",
      },
    },
  },
});

export interface SwitchProps {
  checked: boolean;
}

export const Switch = ({ checked }: SwitchProps) => {
  const [internalChecked, setInternalChecked] = useState(checked);

  return (
    <SwitchButton
      aria-checked={internalChecked}
      type="submit"
      role="switch"
      aria-label="Feature flag status"
      onClick={() => setInternalChecked((s) => !s)}
    >
      <Text>Off</Text>
      <SwitchInnerWrapper checked={internalChecked}>
        <StyledThumb aria-hidden checked={internalChecked} />
      </SwitchInnerWrapper>
      <Text>On</Text>
    </SwitchButton>
  );
};
