export const getFocusableNodes = (node: HTMLElement) => {
  const nodes = [
    ...node.querySelectorAll(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    ),
  ];
  return nodes.filter((node) => {
    if (node.hasAttribute("disabled")) return false;

    return node.getAttribute("tabindex") !== "-1";
  });
};
