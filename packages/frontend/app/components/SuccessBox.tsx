import { useEffect, useRef } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

export interface SuccessBoxProps {
  children: React.ReactNode;
  id: string;
}

export const SuccessBox = ({ children, id, ...props }: SuccessBoxProps) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef?.current?.focus();
  }, []);

  return (
    <p ref={boxRef} tabIndex={-1} id={id} className="success-box" {...props}>
      <AiOutlineCheckCircle aria-hidden />
      {children}
    </p>
  );
};
