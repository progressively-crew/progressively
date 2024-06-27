export interface TrackOpts {
  posX?: number;
  posY?: number;
  selector?: string;
  data?: any;
}

export type TrackFn = (eventName: string, opts?: TrackOpts) => void;

export interface AnalyticsEvent {
  name: string;
  opts?: TrackOpts;
}
