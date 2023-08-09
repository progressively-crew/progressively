export enum EventTypes {
  Metric = 'metric',
  Evaluation = 'evaluation',
}

export interface Variant {
  uuid: string;
  rolloutPercentage: number;
  isControl: boolean;
  value: string;
}

export interface MetricDto {
  name: string;
  variantId?: string;
}
