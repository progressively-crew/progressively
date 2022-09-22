import { BsCheck } from "react-icons/bs";
import { styled } from "./stitches.config";

const SwitchButton = styled("button", {
  display: "flex",
  alignItems: "center",
  gap: "$spacing$2",
  height: "$cta",
  backgroundColor: "transparent",
  cursor: "pointer",
  border: "none",
  borderRadius: "$borderRadius$regular",
  padding: "0 $spacing$3",
  margin: "0 -$spacing$3",

  "&:active .switch-thumb": {
    width: 30,
  },

  "&:active .switch-thumb.active": {
    marginLeft: -20,
  },
});

const StyledThumb = styled("span", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 20,
  height: "100%",
  backgroundColor: "$heracles",
  borderRadius: "9999px",
  transition: "all 100ms",
  transform: "translateX(0%)",
  willChange: "transform",
  fontSize: "$jupiter",
  color: "$hermes",
  boxShadow: "0 2px 6px rgba(0,0,0,.1)",

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
  color: "$hadesLight",
  fontFamily: "$default",
});

const SwitchInnerWrapper = styled("span", {
  padding: "$spacing$1",
  borderRadius: "9999px",
  width: 40,
  height: 20,
  background: "$hades",

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
  onLabel?: string;
  offLabel?: string;
}

export const Switch = ({
  checked,
  type = "submit",
  onClick,
  label,
  onLabel,
  offLabel,
}: SwitchProps) => {
  const className = checked ? "switch-thumb active" : "switch-thumb";

  return (
    <SwitchButton
      aria-checked={checked}
      type={type}
      role="switch"
      aria-label={label}
      onClick={onClick}
    >
      <Text>{offLabel || "Off"}</Text>
      <SwitchInnerWrapper checked={checked}>
        <StyledThumb className={className} aria-hidden checked={checked}>
          {checked && <BsCheck />}
        </StyledThumb>
      </SwitchInnerWrapper>
      <Text>{onLabel || "On"}</Text>
    </SwitchButton>
  );
};
