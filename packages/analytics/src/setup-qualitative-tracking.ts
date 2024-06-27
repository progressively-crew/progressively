import { isElementInteractive } from "./isInteractive";
import { TrackFn } from "./types";
import { finder } from "./vendor/finder";

export const setupQualitativeTracking = (track: TrackFn) => {
  document.addEventListener("click", (e) => {
    if (!e.target) return;

    const target = e.target as HTMLElement;

    if (!isElementInteractive(target)) return;

    const selector = finder(target, { seedMinLength: 4 });

    track("__click", { posX: e.pageX, posY: e.pageY, selector });
  });
};
