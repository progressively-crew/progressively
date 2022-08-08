import React from "react";
import { KeyboardKeys } from "~/modules/a11y/utils/keyboardKeys";
import { useHydrated } from "~/modules/misc/hooks/useHydrated";
import { styled } from "~/stitches.config";

const CardWrapper = styled("div", {
  padding: "$spacing$6",
  display: "flex",
  flexDirection: "column",
  background: "$apollo",
  borderRadius: "$borderRadius$regular",
  border: "8px solid transparent",
  transition: "border,box-shadow,transform 0.2s",
  variants: {
    hydrated: {
      true: {
        // when hydrated
        cursor: "pointer",
        "&:active": {
          border: "8px solid $activeBg",
        },
      },
    },
    isClickable: {
      true: {
        "&:hover,&:focus": {
          transform: "scale(1.05)",
          "@media (prefers-reduced-motion: reduce)": {
            transform: "unset",
          },
        },
      },
    },
  },
});

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
      isClickable={Boolean(onClick)}
      tabIndex={isHydrated && onClick ? 0 : undefined}
      hydrated={Boolean(isHydrated && onClick)}
    >
      {children}
    </CardWrapper>
  );
};
