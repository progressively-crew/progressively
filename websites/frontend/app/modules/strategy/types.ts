import { Rule, RuleUpdateDto } from "../rules/types";

export enum ValueToServe {
  Boolean = "Boolean",
  Variant = "Variant",
  String = "String",
  Number = "Number",
}

export enum TargetEntity {
  Field = "Field",
}

export interface StrategyUpdateDto {
  rolloutPercentage?: number;
  valueToServeType: ValueToServe;
  valueToServe?: string;
  variants?: Array<StrategyVariant>;
  rules: Array<RuleUpdateDto>;
}

export interface StrategyVariant {
  rolloutPercentage: number;
  variantUuid: string;
}

export interface Strategy {
  uuid: string;
  rolloutPercentage?: number;
  valueToServeType: ValueToServe;
  rules?: Array<Rule>;
  valueToServe?: string;
  variants?: Array<StrategyVariant>;
}
