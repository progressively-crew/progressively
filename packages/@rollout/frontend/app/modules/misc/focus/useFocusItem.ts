import { useEffect } from "react";
import { Direction } from "~/components/MenuButton/constants";

export const useFocusItem = <T extends HTMLElement | null>(
  ref: React.RefObject<T>,
  selectorDown: string,
  selectorUp: string,
  direction?: Direction
) => {
  useEffect(() => {
    if (!ref.current) return;

    let itemToFocus: HTMLElement | null = null;

    if (direction === Direction.Down) {
      itemToFocus = ref.current.querySelector(
        selectorDown
      ) as HTMLElement | null;
    } else if (direction === Direction.Up) {
      itemToFocus = ref.current.querySelector(selectorUp) as HTMLElement | null;
    }

    itemToFocus?.focus();
  }, [direction]);
};
