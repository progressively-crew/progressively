export interface Variant {
  uuid: string;
  key: string;
  name: string;
  description: string;
  isControl: boolean;
}

export interface Experiment {
  experimentId: string;
  environmentId: string;
  status: ExperimentStatus;
  experiment: {
    uuid: string;
    name: string;
    description: string;
    key: string;
    date: string;
    variants: Array<Variant>;
  };
}

export interface CreateExperimentDTO {
  description?: string;
  name?: string;
}

export interface CreateVariantDTO {
  description?: string;
  name?: string;
}

export enum ExperimentStatus {
  ACTIVATED = "ACTIVATED",
  NOT_ACTIVATED = "NOT_ACTIVATED",
  INACTIVE = "INACTIVE",
}
