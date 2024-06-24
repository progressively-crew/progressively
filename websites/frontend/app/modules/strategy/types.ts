import { Rule, RuleUpdateDto } from "../rules/types";

export enum ValueToServe {
  Boolean = "Boolean",
  Variant = "Variant",
}

export enum TargetEntity {
  Field = "Field",
  Segment = "Segment",
}

export interface StrategyUpdateDto {
  rolloutPercentage?: number;
  valueToServeType: ValueToServe;
  valueToServe?: string;
  variants?: Array<StrategyVariant>;
  rules: Array<RuleUpdateDto>;
  whenPredicate: WhenPredicate;
  whenTimestamp?: Date;
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
  whenPredicate: WhenPredicate;
  whenTimestamp?: string;
}

export enum WhenPredicate {
  Always = "ALWAYS",
  BeforeThe = "BEFORE_THE",
  AfterThe = "AFTER_THE",
}
