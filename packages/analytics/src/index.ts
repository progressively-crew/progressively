import { setup } from "./setup";
import { setupDeepTracking } from "./setup-deep-tracking";
import { setupNavigationListeners } from "./setup-navigation";
import { makeTrack } from "./track";

const { endpoint, bSixtyFour, shouldTrack } = setup();

const track = makeTrack(endpoint, bSixtyFour);
const trackPageView = () => track("Page View");

setupNavigationListeners(trackPageView);
trackPageView();

if (shouldTrack) {
  setupDeepTracking(track);
}

(window as any).track = track;
