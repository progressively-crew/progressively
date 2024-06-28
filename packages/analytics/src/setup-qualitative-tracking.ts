import { isElementInteractive } from "./isInteractive";
import { TrackFn } from "./types";
import { finder } from "./vendor/finder";

const AnalyticsAttrToPreventTracking = "data-analytics-click";

export const setupQualitativeTracking = (
  track: TrackFn,
  flushEvents: () => Promise<Response>
) => {
  document.addEventListener("click", (e) => {
    if (!e.target) return;

    const target = e.target as HTMLElement;

    // Once we click on the link with CTRL / CMD, we don't want to prevent
    if (target.getAttribute(AnalyticsAttrToPreventTracking)) return;
    if (!isElementInteractive(target)) return;

    const selector = finder(target, { seedMinLength: 4 });
    track("__click", { posX: e.pageX, posY: e.pageY, selector });

    if (
      target.tagName === "A" &&
      target.getAttribute("href") &&
      target.getAttribute("target") !== "_blank"
    ) {
      e.preventDefault();

      const openInNewTab = e.ctrlKey || e.metaKey;
      const virtualAnchor = document.createElement("a");

      if (openInNewTab) {
        virtualAnchor.target = "_blank";
      }

      virtualAnchor.href = target.getAttribute("href")!;
      virtualAnchor.setAttribute(AnalyticsAttrToPreventTracking, "true");

      return flushEvents().then(() => {
        virtualAnchor.click();
      });
    }
  });
};
