import React, { useEffect, useRef } from "react";
import { getFocusableNodes } from "./helpers/getFocusableNodes";
import { KeyboardKeys } from "./helpers/keyboardKeys";

export interface FocusTrapProps {
  children: React.ReactNode;
  isActive: boolean;
  initialElementSelector?: string;
}

export const FocusTrap = ({
  children,
  isActive,
  initialElementSelector,
}: FocusTrapProps) => {
  const trappedRef = useRef<HTMLElement>(null);

  /**
   * Restore the focus to the previously focused element (often, it's the CTA that opened the trap)
   */
  useEffect(() => {
    if (!isActive) return;

    const currentFocus = document.activeElement as HTMLElement | null;

    return () => {
      currentFocus?.focus();
    };
  }, [isActive]);

  /**
   * Sends the focus to the first element of the focus trap tree
   */
  useEffect(() => {
    if (!isActive) return;

    if (!trappedRef.current) return;

    // Sends the focus to the element matching the selector if passed
    if (initialElementSelector) {
      const focusableElement = trappedRef.current.querySelector(
        `#${initialElementSelector}`
      );

      if (focusableElement) {
        return (focusableElement as HTMLElement).focus();
      }
    }

    const focusableChildren = getFocusableNodes(trappedRef.current);

    if (focusableChildren.length > 0) {
      const firstElement = focusableChildren[0] as HTMLElement | undefined;

      firstElement?.focus();
    } else {
      console.warn(
        "[FocusTrap]: it seems there are no focusable elements in the focus trap tree. Make sure there s at least one."
      );
    }
  }, [isActive, initialElementSelector]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== KeyboardKeys.TAB) return;

    const focusableChildren = getFocusableNodes(trappedRef.current!);

    if (focusableChildren.length > 0) {
      const firstElement = focusableChildren[0] as HTMLElement | undefined;
      const lastElement = focusableChildren[focusableChildren.length - 1] as
        | HTMLElement
        | undefined;

      // e.shiftKey allows to verify reverse tab
      if (e.shiftKey) {
        if (firstElement === document.activeElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else if (lastElement === document.activeElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  return (
    <div ref={trappedRef} onKeyDown={isActive ? handleKeyDown : undefined}>
      {children}
    </div>
  );
};
