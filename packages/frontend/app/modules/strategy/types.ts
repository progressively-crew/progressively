import { Rule, RuleType } from "../rules/types";

export enum ValueToServe {
  Boolean = "Boolean",
  Variant = "Variant",
  String = "String",
  Number = "Number",
}

export interface StrategyUpdateDto {
  rolloutPercentage?: number;
  valueToServeType: ValueToServe;
  valueToServe?: string;
}

export interface Strategy {
  uuid: string;
  rolloutPercentage?: number;
  valueToServeType: ValueToServe;
  rules?: Array<Rule>;
  valueToServe?: string;
}
