export const closestWithAttribute = (el: HTMLElement, attribute: string) => {
  if (el.getAttribute(attribute)) {
    return el;
  }

  return el.closest<HTMLElement>(`[${attribute}]`);
};
