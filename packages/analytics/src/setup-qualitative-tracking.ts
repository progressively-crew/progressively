import { TrackFn } from "./types";
import { finder } from "./vendor/finder";

export const setupQualitativeTracking = (track: TrackFn) => {
  document.addEventListener("click", (e) => {
    const selector = e.target
      ? finder(e.target as Element, { seedMinLength: 4 })
      : undefined;
    track("__click", { posX: e.pageX, posY: e.pageY, selector });
  });
};
