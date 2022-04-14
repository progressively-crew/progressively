export type ActivationType = "boolean" | "percentage";

export interface Activation {
  type: ActivationType;
}
export interface BooleanActivation extends Activation {
  type: "boolean";
}
export interface PercentageActivation extends Activation {
  type: "percentage";
}
