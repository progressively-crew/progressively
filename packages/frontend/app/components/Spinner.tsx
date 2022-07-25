import { keyframes, styled } from "~/stitches.config";

const spin = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const Spinner = styled("div", {
  display: "inline-block",
  width: "16px",
  height: "16px",
  border: " 3px solid $backgroundAccent",
  borderRadius: " 50%",
  borderTopColor: "#fff",
  animation: `${spin} 1s ease-in-out infinite`,
});
