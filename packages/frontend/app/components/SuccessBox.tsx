import { useEffect, useRef } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { styled } from "~/stitches.config";

export interface SuccessBoxProps {
  children: React.ReactNode;
  id: string;
}

const SuccessBoxWrapper = styled("p", {
  alignItems: "center",
  background: "$successBg",
  color: "$successFg",
  border: "1px solid $successBorder",
  padding: "$spacing$8",
  borderRadius: "$borderRadius$regular",
  fontFamily: "$default",
  display: "flex",
  gap: "$spacing$3",

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
