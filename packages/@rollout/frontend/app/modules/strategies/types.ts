import { ActivationType } from "./types/activation";

export enum ComparatorEnum {
  Equals = "eq",
  NotEquals = "neq",
}

export interface StrategyCreateDTO {
  name: string;
  strategyRuleType: "default" | "field" | "pool";

  // only exists for the type of "field"
  fieldName?: string;
  fieldComparator?: "eq";
  fieldValue?: string;

  activationType?: ActivationType;

  // only exists for activation "percentage"
  rolloutPercentage?: number;
}

export interface StrategyRetrieveDTO extends StrategyCreateDTO {
  uuid: string;
}
