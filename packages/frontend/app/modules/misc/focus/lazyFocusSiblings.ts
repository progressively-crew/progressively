const getFocusedIndex = (list: NodeList, item: Element) => {
  for (let i = 0; i < list.length; i++) {
    if (list.item(i) === item) {
      return i;
    }
  }

  return -1;
};

export const lazyFocusSiblings = <T extends HTMLElement | null>(
  el: T,
  selector: string
) => {
  const focusNextSibling = () => {
    const activeFocus = document.activeElement;

    if (!el) return;
    if (!activeFocus) return;

    const elements = el.querySelectorAll<HTMLElement>(selector);
    const indexOfFocus = getFocusedIndex(elements, activeFocus);

    if (indexOfFocus > -1) {
      const nextIndex = indexOfFocus + 1;
      const nextItem = elements.item(nextIndex) || elements.item(0);

      if (nextItem) {
        nextItem.focus();
      }
    }
  };

  const focusPreviousSibling = () => {
    const activeFocus = document.activeElement;

    if (!el) return;
    if (!activeFocus) return;

    const elements = el.querySelectorAll<HTMLElement>(selector);
    const indexOfFocus = getFocusedIndex(elements, activeFocus);

    if (indexOfFocus > -1) {
      const nextIndex = indexOfFocus - 1;
      const nextItem =
        elements.item(nextIndex) || elements.item(elements.length - 1);

      if (nextItem) {
        nextItem.focus();
      }
    }
  };

  return { focusNextSibling, focusPreviousSibling };
};
