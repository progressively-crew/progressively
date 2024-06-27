import { getCssSelector } from "css-selector-generator";

import { TrackFn } from "./types";

export const setupQualitativeTracking = (track: TrackFn) => {
  document.addEventListener("click", (e) => {
    const selector = getCssSelector(e.target);
    track("__click", { posX: e.pageX, posY: e.pageY, selector });
  });
};
