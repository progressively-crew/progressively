import { Link, useLocation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai/index.js";
import { MdClose } from "react-icons/md/index.js";
import { HStack } from "../HStack";

export interface SuccessBoxProps {
  children: React.ReactNode;
  id: string;
}

export const SuccessBox = ({ children, id, ...props }: SuccessBoxProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const boxRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (isVisible) {
      const currentFocus = document.activeElement as HTMLElement;
      boxRef?.current?.focus();

      const timerId = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => {
        clearTimeout(timerId);
        currentFocus?.focus();
      };
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="z-20 bg-white dark:bg-white shadow-lg p-4 bg-white border border-slate-200 rounded motion-safe:animate-fade-enter-bottom fixed right-4 bottom-4"
      key={id}
    >
      <div className="gap-2 max-w-5xl w-full mx-auto flex flex-row justify-between items-center">
        <p
          ref={boxRef}
          tabIndex={-1}
          id={id}
          {...props}
          className="success-box"
        >
          <HStack as="span" spacing={2}>
            <AiOutlineCheckCircle aria-hidden className="text-emerald-400" />
            <span className="text-sm">{children}</span>
          </HStack>
        </p>

        <Link
          to={location.pathname}
          className="text-xl rounded bg-transparent hover:bg-slate-100 active:bg-slate-200 flex items-center justify-center w-6 h-6"
          preventScrollReset={true}
        >
          <MdClose aria-label="Close the banner" />
        </Link>
      </div>
    </div>
  );
};
