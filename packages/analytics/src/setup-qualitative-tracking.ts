import { TrackFn } from "./types";

export const setupQualitativeTracking = (track: TrackFn) => {
  document.addEventListener("click", (e) => {
    track("__click", { posX: e.clientX, posY: e.clientY });
  });
};
