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
  boxShadow: `0 2px 2px $hermes`,
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
  fontSize: "$uranus",
  color: "$secondary",
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
        backgroundColor: "$hermes",
      },
    },
  },
});

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
    <SwitchButton
      aria-checked={checked}
      type={type}
      role="switch"
      aria-label={"Feature flag status"}
      onClick={onClick}
    >
      <Text>Off</Text>
      <SwitchInnerWrapper checked={checked}>
        <StyledThumb aria-hidden checked={checked} />
      </SwitchInnerWrapper>
      <Text>On</Text>
    </SwitchButton>
  );
};
