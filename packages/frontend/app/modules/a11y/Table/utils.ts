import { closestFocusable } from "~/modules/misc/utils/closestFocusable";
import { closestWithAttribute } from "~/modules/misc/utils/closestWithAttribute";

export const moveToRow = (
  el: HTMLElement,
  root: HTMLElement,
  position: number
) => {
  const closestCol = closestWithAttribute(el, "aria-colindex");
  const colIndex = closestCol?.getAttribute("aria-colindex") || "0";

  const closestRow = closestWithAttribute(el, "aria-rowindex");
  const rowIndex = closestRow?.getAttribute("aria-rowindex") || "0";

  const nextRowIndex = parseInt(rowIndex) + position;

  const nextRow = root.querySelector<HTMLElement>(
    `[aria-rowindex="${nextRowIndex}"]`
  );

  if (nextRow) {
    const nextCol = closestFocusable(nextRow, `[aria-colindex="${colIndex}"]`);

    return nextCol;
  }

  return null;
};

export const moveToCol = (el: HTMLElement, position: number) => {
  const closestCol = closestWithAttribute(el, "aria-colindex");
  const colIndex = closestCol?.getAttribute("aria-colindex") || "0";

  const closestRow = closestWithAttribute(el, "aria-rowindex");
  const nextColIndex = parseInt(colIndex) + position;

  if (closestRow) {
    const nextCol = closestFocusable(
      closestRow,
      `[aria-colindex="${nextColIndex}"]`
    );

    return nextCol;
  }

  return null;
};
