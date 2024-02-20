export interface TrackOpts {
  posX?: number;
  posY?: number;
  data?: any;
}

export type TrackFn = (
  eventName: string,
  opts?: TrackOpts
) => Promise<Response>;

export const makeTrack = (endpoint: string, params: string) => {
  const track: TrackFn = (eventName: string, opts: TrackOpts = {}) => {
    const payload = {
      name: eventName,
      url: window.location.href,
      referer: window.document.referrer || null,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      posX: opts.posX,
      posY: opts.posY,
      data: opts.data
        ? typeof opts.data === "string"
          ? opts.data
          : JSON.stringify(opts.data)
        : undefined,
    };

    return fetch(`${endpoint}/sdk/${params}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
  };

  return track;
};
