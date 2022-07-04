export interface Variant {
  uuid: string;
  key: string;
  name: string;
  description: string;
  isControl: boolean;
}
export interface Experiment {
  uuid: string;
  name: string;
  description: string;
  key: string;
  date: string;
  variants: Array<Variant>;
}

export interface CreateExperimentDTO {
  description?: string;
  name?: string;
}
