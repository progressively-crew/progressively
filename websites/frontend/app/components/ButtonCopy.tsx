import React, {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { BsCheck } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";
import { KeyboardKeys } from "~/modules/a11y/utils/keyboardKeys";
import { useHydrated } from "~/modules/misc/hooks/useHydrated";
import { Tooltip } from "./Tooltip/Tooltip";
import { VisuallyHidden } from "./VisuallyHidden";

export interface ButtonCopyProps {
  toCopy: string;
  toCopyAlternative?: string; // for hiding secrets values
  children: React.ReactNode;
  size?: "M" | "S";
}

const sizeClasses = {
  M: "h-10 pl-4",
  S: "h-7 text-sm pl-2",
};

export const ButtonCopy = forwardRef(
  (
    {
      toCopy,
      children,
      toCopyAlternative,
      size = "M",
      ...props
    }: ButtonCopyProps,
    ref: any
  ) => {
    const timerIdRef = useRef<NodeJS.Timeout>();
    const [isCopied, setIsCopied] = useState(false);
    const isHydrated = useHydrated();
    const id = useId();

    useEffect(() => {
      if (isCopied) {
        if (timerIdRef.current) {
          clearTimeout(timerIdRef.current);
        }

        timerIdRef.current = setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      }

      const timerId = timerIdRef.current;

      return () => {
        if (timerId) {
          clearTimeout(timerId);
        }
      };
    }, [isCopied]);

    const sizeClass = sizeClasses[size];

    const sharedClassName = `${sizeClass} rounded font-mono text-xs whitespace-nowrap inline-flex flex-row items-center border border-gray-300 text-gray-500 hover:bg-slate-50 active:bg-slate-100`;

    const sharedIconClassName =
      "rounded-xs flex items-center justify-center text-lg h-10 w-10";

    if (isHydrated) {
      const copyToClipBoardProps = props as HTMLAttributes<HTMLButtonElement>;

      const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        navigator.clipboard.writeText(toCopy).then(() => {
          setIsCopied(true);
        });
      };

      const handleKeyDow = (e: React.KeyboardEvent) => {
        // When used inside a Card, we don't want to trigger the link click when
        // pressing enter
        if (e.key === KeyboardKeys.ENTER) {
          e.stopPropagation();
        }
      };

      return (
        <Tooltip
          tooltip={
            <p>
              Copy <strong>{toCopyAlternative || toCopy}</strong> to clipboard
            </p>
          }
        >
          <button
            aria-labelledby={id}
            ref={ref}
            type="button"
            onClick={handleClick}
            aria-live="polite"
            onKeyDown={handleKeyDow}
            {...copyToClipBoardProps}
          >
            <span className={sharedClassName}>
              <span id={id}>
                {isCopied ? (
                  <span>
                    Copied <VisuallyHidden>{toCopy}</VisuallyHidden>
                  </span>
                ) : (
                  <span>
                    <VisuallyHidden>Copy </VisuallyHidden>
                    {children}
                  </span>
                )}
              </span>
              <span className={sharedIconClassName}>
                {isCopied ? (
                  <BsCheck aria-hidden />
                ) : (
                  <MdContentCopy aria-hidden />
                )}
              </span>
            </span>
          </button>
        </Tooltip>
      );
    }

    const spanProps = props as HTMLAttributes<HTMLSpanElement>;

    return (
      <span aria-live="polite" className={sharedClassName} {...spanProps}>
        {children}

        <span className={sharedIconClassName}>
          <MdContentCopy aria-hidden />
        </span>
      </span>
    );
  }
);

ButtonCopy.displayName = "ButtonCopy";
