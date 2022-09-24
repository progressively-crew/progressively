export const focusInTree = (
  rootNode: HTMLElement,
  childrenSelector: string,
  numberToAdd: number
) => {
  const currentFocus = document.activeElement;
  const childrenLi = rootNode.querySelectorAll(childrenSelector);

  let focusedIndex = 0;
  for (const [index, el] of childrenLi.entries()) {
    if (currentFocus === el) {
      focusedIndex = index;
    }
  }

  let nextFocusable: HTMLElement;
  const lastItemIndex = childrenLi.length - 1;
  const nextIndex = focusedIndex + numberToAdd;

  if (nextIndex > lastItemIndex) {
    nextFocusable = childrenLi.item(0);
  } else if (nextIndex < 0) {
    nextFocusable = childrenLi.item(lastItemIndex);
  } else {
    nextFocusable = childrenLi.item(nextIndex);
  }

  return nextFocusable.focus();
};
