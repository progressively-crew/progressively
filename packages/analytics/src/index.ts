import { setup } from "./setup";
import { setupNavigationListeners } from "./setup-navigation-listeners";

const { endpoint, bSixtyFour } = setup();

const track = (eventName: string) => {
  const payload = {
    name: eventName,
    url: window.location.href,
    referer: window.document.referrer || null,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
  };

  return fetch(`${endpoint}/sdk/${bSixtyFour}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
};

const trackPageView = () => track("Page View");

setupNavigationListeners(trackPageView);
trackPageView();

(window as any).track = track;
