export enum ComparatorType {
  Eq = "eq",
  NotEq = "neq",
}

export type StrategyRuleType = "default" | "field" | "pool";
export interface StrategyRule {
  type: StrategyRuleType;
}
