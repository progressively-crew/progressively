const scriptEl = window.document.currentScript;

const endpoint = scriptEl?.getAttribute("data-progressively-endpoint");
const clientKey = scriptEl?.getAttribute("data-progressively-client-key");

if (!endpoint || !clientKey) {
  throw new Error(
    "[Progressively]: [data-progressively-endpoint] and [data-progressively-client-key] attributes should be set on the script tag."
  );
}

const fields = {
  clientKey: clientKey,
};

const bSixtyFour = btoa(JSON.stringify(fields));

const track = (eventName: string) => {
  const payload = {
    name: eventName,
    url: window.location.href,
    referer: window.document.referrer || null,
  };

  return fetch(`${endpoint}/sdk/${bSixtyFour}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
};

const trackPageView = () => track("Page View");

// Listen for popstate event (triggered by browser navigation buttons)

window.addEventListener("popstate", trackPageView);

// Intercept history.pushState and history.replaceState to detect SPA navigation changes
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function (...args) {
  originalPushState.apply(this, args);
  trackPageView();
};

history.replaceState = function (...args) {
  originalReplaceState.apply(this, args);
  trackPageView();
};

trackPageView();

(window as any).track = track;
