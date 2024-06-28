import { setup } from "./setup";
import { setupNavigationListeners } from "./setup-navigation-listeners";
import { setupQualitativeTracking } from "./setup-qualitative-tracking";
import { showQualitativeAnalytics } from "./show-qualitative-analytics";
import { AnalyticsEvent, TrackFn } from "./types";

const { endpoint, bSixtyFour, shouldTrackQuantitative } = setup();
const isShowingHotZones =
  window.location.href.indexOf("#__progressively") !== -1;

let eventsBuffer: Array<AnalyticsEvent> = [];
const MAX_BATCH_SIZE = 10;
const FLUSH_INTERVAL = 5000;

const flushEvents = () => {
  const payloads = eventsBuffer.map((ev) => ({
    name: ev.name,
    url: window.location.href,
    referer: window.document.referrer || undefined,
    viewportWidth: window.innerWidth,
    viewportHeight: document.documentElement.scrollHeight,
    posX: ev.opts?.posX,
    posY: ev.opts?.posY,
    selector: ev.opts?.selector,
    data: ev.opts?.data
      ? typeof ev.opts.data === "string"
        ? ev.opts.data
        : JSON.stringify(ev.opts.data)
      : undefined,
  }));

  // Reset the buffer when it's mapped to the payloads object so that we can continue feeding it
  eventsBuffer = [];

  return fetch(`${endpoint}/sdk/${bSixtyFour}`, {
    method: "POST",
    body: JSON.stringify(payloads),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

setInterval(() => {
  if (eventsBuffer.length > 0) {
    flushEvents();
  }
}, FLUSH_INTERVAL);

const track: TrackFn = (eventName, opts = {}) => {
  eventsBuffer.push({ name: eventName, opts });

  if (eventsBuffer.length >= MAX_BATCH_SIZE) {
    flushEvents();
  }

  return Promise.resolve(undefined);
};

const trackPageView = () => track("Page View");

if (isShowingHotZones) {
  showQualitativeAnalytics(endpoint);
} else {
  setupNavigationListeners(trackPageView);
  trackPageView();

  if (shouldTrackQuantitative) {
    setupQualitativeTracking(track, flushEvents);
  }
}

(window as any).track = track;
