export enum ComparatorType {
  Eq = "eq",
  NotEq = "neq",
}

export type StrategyRuleType = "default" | "field" | "pool";
export interface StrategyRule {
  type: StrategyRuleType;
}

export interface DefaultStrategyRule extends StrategyRule {
  type: "default";
}

export interface FieldStrategyRule extends StrategyRule {
  type: "field";
  field: string;
  predicate: ComparatorType;
  acceptedValues: Array<string>;
}

export interface PoolStrategyRule extends StrategyRule {
  type: "pool";
}
