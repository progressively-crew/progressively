import { Link, useLocation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { HStack } from "../HStack";

export interface SuccessBoxProps {
  children: React.ReactNode;
  id: string;
}

export const SuccessBox = ({ children, id, ...props }: SuccessBoxProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    boxRef?.current?.focus();
  }, []);

  return (
    <div className="p-4 bg-green-100 text-green-700 rounded border-l-8 border-l-green-600 flex flex-row justify-between">
      <p ref={boxRef} tabIndex={-1} id={id} {...props} className="success-box">
        <HStack as="span" spacing={2}>
          <AiOutlineCheckCircle aria-hidden />
          <span>{children}</span>
        </HStack>
      </p>

      <Link to={location.pathname} className="text-xl">
        <MdClose aria-label="Close the banner" />
      </Link>
    </div>
  );
};
