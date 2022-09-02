export interface Variant {
  uuid: string;
  rolloutPercentage: number;
  isControl: boolean;
  value: string;
}

export type VariantCreateDTO = Omit<Variant, "id">;
