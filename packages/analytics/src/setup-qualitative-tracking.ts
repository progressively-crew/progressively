import { TrackFn } from "./types";

export const setupQualitativeTracking = (track: TrackFn) => {
  document.addEventListener("click", (e) => {
    track("__click", { posX: e.pageX, posY: e.pageY });
  });
};
