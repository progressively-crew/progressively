import { useEffect, useRef } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { HStack } from "../HStack";

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
    <p
      ref={boxRef}
      tabIndex={-1}
      id={id}
      className="success-box p-4 bg-green-100 text-green-700 rounded border-l-8 border-l-green-600"
      {...props}
    >
      <HStack as="span" spacing={2}>
        <AiOutlineCheckCircle aria-hidden />
        <span>{children}</span>
      </HStack>
    </p>
  );
};
