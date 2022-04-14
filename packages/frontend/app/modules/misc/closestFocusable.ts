export const closestFocusable = (el: HTMLElement, selector: string) => {
  const nextRow = el.querySelector(selector) as HTMLElement | undefined;

  if (!nextRow) return null;

  if (nextRow.getAttribute("tabindex")) {
    return nextRow;
  }

  return nextRow.querySelector("[tabindex]") as HTMLElement | null;
};
