import { styled } from "../stitches.config";

export const Radio = styled("input", {
  margin: 0,
  padding: 0,
  backgroundColor: "transparent",
  border: "1px solid $hermes",
  borderRadius: "50%",
  height: 24,
  width: 24,
  "-webkit-appearance": "none",

  "&:after": {
    transition: "all .2s",
    borderRadius: " 50%",
    content: "",
    position: "relative",
    zIndex: 1,
    display: "block",
    height: 18,
    width: 18,
    left: 2,
    top: 2,
    transform: "scale(0)",
  },
  "&:active:after": {
    background: "$hermes",
    transform: "scale(0.5)",
  },
  "&:checked:after": {
    background: "$hermes",
    transform: "scale(1)",
  },
});
