export const getFocusableNodes = (
  node: HTMLElement,
  includeNegativeTabIndex = false
) => {
  const nodes = [
    ...node.querySelectorAll(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    ),
  ];
  const focusables = nodes.filter((node) => {
    if (node.hasAttribute("disabled")) return false;
    if (includeNegativeTabIndex) return true;

    return node.getAttribute("tabindex") !== "-1";
  });

  return focusables;
};
