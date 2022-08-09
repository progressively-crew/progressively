import { keyframes, styled } from "~/stitches.config";

const spin = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const Spinner = styled("div", {
  display: "inline-block",
  width: "10px",
  height: "10px",
  border: "3px solid $apollo",
  borderRadius: " 50%",
  borderTopColor: "$currentColor",
  animation: `${spin} 1s ease-in-out infinite`,
});
