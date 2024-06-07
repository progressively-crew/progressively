export interface Sample {
  html: string;
  rawCode: string;
  installation: string;
}

export type SampleReturn = Promise<Sample>;
