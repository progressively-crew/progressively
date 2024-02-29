export interface Variant {
  uuid: string;
  rolloutPercentage: number;
  isControl: boolean;
  value: string;
}

export const ReservedEventName = {
  PageView: 'Page View',
};

export type Timeframe = 7 | 30 | 90;
export const Timeframes: Array<number> = ['7', '30', '90'];
