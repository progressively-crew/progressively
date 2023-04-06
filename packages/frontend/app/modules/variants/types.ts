export interface Variant {
  uuid: string;
  isControl: boolean;
  value: string;
}

export type VariantCreateDTO = Omit<Variant, "uuid" | "isControl">;
