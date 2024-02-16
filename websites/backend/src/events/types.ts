export interface Variant {
  uuid: string;
  rolloutPercentage: number;
  isControl: boolean;
  value: string;
}

export const ReservedEventName = {
  PageView: 'Page View',
};
