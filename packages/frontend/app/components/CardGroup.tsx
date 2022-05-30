import React from "react";
import { KeyboardKeys } from "~/modules/a11y/utils/keyboardKeys";
import { useHydrated } from "~/modules/misc/hooks/useHydrated";
import { styled } from "~/stitches.config";

export const CardGroup = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridColumnGap: "$spacing$4",
  gridRowGap: "$spacing$4",
  variants: {
    cols: {
      2: {
        gridTemplateColumns: "1fr 1fr",
      },
    },
  },
});

const CardWrapper = styled("div", {
  minHeight: "$cardHeight",
  background: "$backgroundAccent",
  borderRadius: "$borderRadius$regular",
  padding: "$spacing$8 0",
  border: "8px solid transparent",
  transition: "border 0.2s",
  variants: {
    hydrated: {
      true: {
        // when hydrated
        cursor: "pointer",
        "&:active": {
          border: "8px solid $hover",
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
      className={`card ${className}`}
      tabIndex={isHydrated && onClick ? 0 : undefined}
      hydrated={Boolean(isHydrated && onClick)}
    >
      {children}
    </CardWrapper>
  );
};

export const CardHeader = styled("div", {
  padding: "0 $spacing$10",
  fontFamily: "$default",
  color: "$title",
  fontSize: "$content",

  "& a": {
    color: "$title",
  },
});

export const CardContent = styled("div", {
  padding: "0 $spacing$10",
  "& p": {
    fontSize: "$btn",
  },
});
