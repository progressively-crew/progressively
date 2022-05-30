import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiOutlineCopy } from "react-icons/ai";
import { useHydrated } from "~/modules/misc/hooks/useHydrated";
import { Button } from "./Buttons/Button";
import { VisuallyHidden } from "./VisuallyHidden";

export interface ButtonCopyProps extends HTMLAttributes<HTMLButtonElement> {
  toCopy: string;
  children: React.ReactNode;
}

export const ButtonCopy = ({ toCopy, children, ...props }: ButtonCopyProps) => {
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

  if (isHydrated) {
    const copyToClipBoardProps = props as HTMLAttributes<HTMLButtonElement>;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsCopied(true);
    };

    return (
      <CopyToClipboard text={toCopy}>
        <Button
          onClick={handleClick}
          aria-live="polite"
          icon={<AiOutlineCopy aria-hidden />}
          variant="ghost"
          {...copyToClipBoardProps}
        >
          {isCopied ? (
            "Copied"
          ) : (
            <span>
              <VisuallyHidden>Copy </VisuallyHidden>
              {children}
            </span>
          )}
        </Button>
      </CopyToClipboard>
    );
  }

  const spanProps = props as HTMLAttributes<HTMLSpanElement>;

  return (
    <Button
      as={"span"}
      aria-live="polite"
      icon={<AiOutlineCopy aria-hidden />}
      variant="ghost"
      {...spanProps}
    >
      {children}
    </Button>
  );
};
