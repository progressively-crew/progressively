import { useEffect, useRef } from "react";

export const useRestoreFocus = (when: boolean) => {
  const activeFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (when) {
      activeFocus.current = document.activeElement as HTMLElement | null;
    }
  }, [when]);

  const restoreFocus = () => {
    activeFocus?.current?.focus();
  };

  return restoreFocus;
};
