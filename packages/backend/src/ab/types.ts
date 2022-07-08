export interface VariantHit {
  date: Date;
  count: number;
  uuid: string;
  name: string;
}

export class ActivateExperimentDTO {
  status: string;
}

export enum ExperimentStatus {
  ACTIVATED = 'ACTIVATED',
  NOT_ACTIVATED = 'NOT_ACTIVATED',
  INACTIVE = 'INACTIVE',
}
