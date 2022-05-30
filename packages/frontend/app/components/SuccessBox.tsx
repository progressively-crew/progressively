import { useEffect, useRef } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { styled } from "~/stitches.config";

export interface SuccessBoxProps {
  children: React.ReactNode;
  id: string;
}

const SuccessBoxWrapper = styled("p", {
  display: "flex",
  alignItems: "center",
  background: "$successBg",
  color: "$successFg",
  border: "1px solid $successBorder",
  padding: "$spacing$3",
  borderRadius: "$borderRadius$regular",
  fontFamily: "$default",

  "& svg": {
    marginRight: "$spacing$1",
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
      {children}
    </SuccessBoxWrapper>
  );
};
