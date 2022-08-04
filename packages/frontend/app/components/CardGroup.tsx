import React, { HTMLAttributes } from "react";
import { KeyboardKeys } from "~/modules/a11y/utils/keyboardKeys";
import { useHydrated } from "~/modules/misc/hooks/useHydrated";

export const CardGroup = (props: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} />;
};

const CardWrapper = (props: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} />;
};

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, className, onClick }: CardProps) => {
  const isHydrated = useHydrated();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case KeyboardKeys.DOWN:
      case KeyboardKeys.RIGHT: {
        const nextSibling = e.currentTarget.nextSibling as HTMLElement | null;

        if (nextSibling?.classList.contains("card")) {
          nextSibling.focus();
        }

        break;
      }

      case KeyboardKeys.UP:
      case KeyboardKeys.LEFT: {
        const prevSibling = e.currentTarget
          .previousSibling as HTMLElement | null;

        if (prevSibling?.classList.contains("card")) {
          prevSibling.focus();
        }

        break;
      }

      case KeyboardKeys.ENTER: {
        onClick?.();
        break;
      }
    }
  };

  return (
    <CardWrapper
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`card ${className || ""}`}
      tabIndex={isHydrated && onClick ? 0 : undefined}
    >
      {children}
    </CardWrapper>
  );
};

export const CardHeader = (props: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} />;
};

export const CardContent = (props: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} />;
};

export const CardFooter = (props: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} />;
};
