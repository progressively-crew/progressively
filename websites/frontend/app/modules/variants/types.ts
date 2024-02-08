export interface Variant {
  uuid: string;
  isControl: boolean;
  value: string;
  rolloutPercentage: number;
}

export type VariantCreateDTO = Omit<Variant, "uuid" | "isControl">;
