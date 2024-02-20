import { TrackFn } from "./track";

export const setupDeepTracking = (track: TrackFn) => {
  document.addEventListener("click", (e) => {
    track("Click", { posX: e.clientX, posY: e.clientY });
  });

  document.addEventListener("scrollend", () => {
    track("Scroll", { posX: window.scrollX, posY: window.scrollY });
  });
};
