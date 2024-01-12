import { Link, useLocation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { Background } from "../Background";

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
    <div className="motion-safe:animate-fade-enter-bottom fixed right-8 bottom-8 z-10 rounded-lg overflow-hidden shadow-xl">
      <Background spacing="S">
        <div className="rounded bg-white dark:bg-slate-900 p-4 flex flex-row gap-4">
          <div>
            <p className="font-bold text-sm dark:text-white">
              🚀 Operation succeeded!
            </p>

            <p
              ref={boxRef}
              tabIndex={-1}
              id={id}
              {...props}
              className="success-box text-sm dark:text-white"
            >
              {children}
            </p>
          </div>

          <Link
            to={location.pathname}
            className="text-xl rounded bg-transparent hover:bg-slate-100 active:bg-slate-200 flex items-center justify-center w-6 h-6"
            preventScrollReset={true}
          >
            <MdClose aria-label="Close the banner" />
          </Link>
        </div>
      </Background>
    </div>
  );
};
