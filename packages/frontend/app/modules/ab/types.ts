export interface Variant {
  uuid: string;
  key: string;
  name: string;
  description: string;
}
export interface Experiment {
  uuid: string;
  name: string;
  description: string;
  key: string;
  date: string;
  variants: Array<Variant>;
}
