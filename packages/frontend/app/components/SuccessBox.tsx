import { useEffect, useRef } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { keyframes, styled } from "~/stitches.config";

export interface SuccessBoxProps {
  children: React.ReactNode;
  id: string;
}

const bounce = keyframes({
  "0%": { transform: "scale(0.98)", opacity: 0 },
  "50%": { transform: "scale(1.02)" },
  "100%": { transform: "scale(1)", opacity: 1 },
});

const SuccessBoxWrapper = styled("p", {
  alignItems: "center",
  background: "$successBg",
  color: "$successFg",
  border: "1px solid $successBorder",
  padding: "$spacing$6 $spacing$4",
  borderRadius: "$borderRadius$regular",
  fontFamily: "$default",
  display: "flex",
  gap: "$spacing$3",

  animation: `${bounce} 300ms ease-in-out`,
  "@media (prefers-reduced-motion: reduce)": {
    animation: "unset",
  },

  "& svg": {
    fontSize: "$h3",
  },
});

export const SuccessBox = ({ children, id, ...props }: SuccessBoxProps) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef?.current?.focus();
  }, []);

  return (
    <SuccessBoxWrapper
      ref={boxRef}
      tabIndex={-1}
      id={id}
      className="success-box"
      {...props}
    >
      <AiOutlineCheckCircle aria-hidden />
      <span>{children}</span>
    </SuccessBoxWrapper>
  );
};
