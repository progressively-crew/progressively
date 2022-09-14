import { keyframes, styled } from "~/stitches.config";

const fadeInSlide = keyframes({
  "0%": { opacity: "0", transform: "translateY(20px)" },
  "100%": { opacity: "1", transform: "translateY(0)" },
});

export const FadeInSlide = styled("div", {
  animation: `${fadeInSlide} 500ms forwards`,
  "@media (prefers-reduced-motion: reduce)": {
    animation: "unset",
  },
});
