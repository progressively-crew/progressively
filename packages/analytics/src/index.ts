import { setup } from "./setup";
import { setupNavigationListeners } from "./setup-navigation-listeners";
import { setupQualitativeTracking } from "./setup-qualitative-tracking";
import { showQualitativeAnalytics } from "./show-qualitative-analytics";
import { TrackFn } from "./types";

const { endpoint, bSixtyFour, shouldTrackQuantitative } = setup();

const track: TrackFn = (eventName, opts = {}) => {
  const payload = {
    name: eventName,
    url: window.location.href,
    referer: window.document.referrer || null,
    viewportWidth: window.innerWidth,
    viewportHeight: document.documentElement.scrollHeight,
    posX: opts.posX,
    posY: opts.posY,
    data: opts.data
      ? typeof opts.data === "string"
        ? opts.data
        : JSON.stringify(opts.data)
      : undefined,
  };

  return fetch(`${endpoint}/sdk/${bSixtyFour}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
};

const trackPageView = () => track("Page View");

setupNavigationListeners(trackPageView);

if (shouldTrackQuantitative) {
  setupQualitativeTracking(track);
}

if (window.location.href.indexOf("#__progressively") !== -1) {
  showQualitativeAnalytics(endpoint);
}

trackPageView();

(window as any).track = track;
