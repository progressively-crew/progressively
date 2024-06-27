export const isElementInteractive = (element: HTMLElement) => {
  // Check for interactive tag names
  const interactiveTagNames = ["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"];
  if (interactiveTagNames.indexOf(element.tagName) !== -1) {
    return true;
  }

  // Check for contenteditable attribute
  if (element.isContentEditable) {
    return true;
  }

  // Check for tabindex attribute
  if (element.hasAttribute("tabindex") && element.tabIndex >= 0) {
    return true;
  }

  // Check for specific roles
  const interactiveRoles = [
    "button",
    "checkbox",
    "link",
    "menuitem",
    "option",
    "radio",
    "searchbox",
    "slider",
    "spinbutton",
    "switch",
    "textbox",
  ];
  const role = element.getAttribute("role");
  if (role && interactiveRoles.indexOf(role.toLowerCase()) !== -1) {
    return true;
  }

  return false;
};
