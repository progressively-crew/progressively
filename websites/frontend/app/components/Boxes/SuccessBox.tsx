import { Link, useLocation } from "@remix-run/react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { useHydrated } from "~/modules/misc/hooks/useHydrated";

export interface SuccessBoxProps {
  children: React.ReactNode;
  id: string;
}

export const SuccessBox = ({ children, id, ...props }: SuccessBoxProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const isHydrated = useHydrated();
  const boxRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!isHydrated) return;
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
  }, [isVisible, isHydrated]);

  if (!isVisible || !isHydrated) return null;

  return createPortal(
    <div
      className="motion-safe:animate-fade-enter-bottom fixed right-8 bottom-8 z-30 rounded-xl shadow-xl"
      role="alert"
    >
      <div className="rounded-xl bg-white p-4 flex flex-row gap-4 border border-gray-300">
        <div>
          <p className="font-bold text-sm">🚀 Operation succeeded!</p>

          <p
            ref={boxRef}
            tabIndex={-1}
            id={id}
            {...props}
            className="success-box text-sm"
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
    </div>,
    document.body
  );
};
