export const setupNavigationListeners = (callback: () => void) => {
  // Listen for popstate event (triggered by browser navigation buttons)

  window.addEventListener("popstate", callback);

  // Intercept history.pushState and history.replaceState to detect SPA navigation changes
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    callback();
  };

  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    callback();
  };
};
