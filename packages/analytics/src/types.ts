export interface TrackOpts {
  posX?: number;
  posY?: number;
  selector?: string;
  data?: any;
}

export type TrackFn = (eventName: string, opts?: TrackOpts) => Promise<void>;

export interface AnalyticsEvent {
  name: string;
  opts?: TrackOpts;
}
