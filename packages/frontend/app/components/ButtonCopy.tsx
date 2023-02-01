/* eslint-disable sonarjs/cognitive-complexity */
import React, {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { TbClipboardText, TbClipboardCheck } from "react-icons/tb";
import { KeyboardKeys } from "~/modules/a11y/utils/keyboardKeys";
import { useHydrated } from "~/modules/misc/hooks/useHydrated";
import { Tooltip } from "./Tooltip/Tooltip";
import { VisuallyHidden } from "./VisuallyHidden";

export interface ButtonCopyProps {
  toCopy: string;
  children: React.ReactNode;
}

export const ButtonCopy = forwardRef(
  ({ toCopy, children, ...props }: ButtonCopyProps, ref: any) => {
    const timerIdRef = useRef<NodeJS.Timeout>();
    const [isCopied, setIsCopied] = useState(false);
    const isHydrated = useHydrated();

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

    const sharedClassName =
      "rounded h-10 pl-4 font-mono text-xs whitespace-nowrap inline-flex flex-row items-center border border-gray-300 text-gray-500 dark:border-slate-500 dark:text-gray-200";

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
        <span className={sharedClassName}>
          <span>
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
          <Tooltip
            tooltip={
              <p>
                Copy <strong>{toCopy}</strong> to clipboard
              </p>
            }
          >
            <button
              ref={ref}
              type="button"
              onClick={handleClick}
              aria-live="polite"
              onKeyDown={handleKeyDow}
              {...copyToClipBoardProps}
            >
              <span className={sharedIconClassName}>
                {isCopied ? (
                  <TbClipboardCheck aria-hidden />
                ) : (
                  <TbClipboardText aria-hidden />
                )}
              </span>
            </button>
          </Tooltip>
        </span>
      );
    }

    const spanProps = props as HTMLAttributes<HTMLSpanElement>;

    return (
      <span aria-live="polite" className={sharedClassName} {...spanProps}>
        <span className={sharedIconClassName}>
          <TbClipboardText aria-hidden />
        </span>
        {children}
      </span>
    );
  }
);

ButtonCopy.displayName = "ButtonCopy";
