export enum ComparatorEnum {
  Equals = "eq",
  Contains = "contains",
}

export interface StrategyCreateDTO {
  name: string;
  strategyRuleType: "default" | "field" | "pool";

  // only exists for the type of "field"
  fieldName?: string;
  fieldComparator?: ComparatorEnum;
  fieldValue?: string;
}

export interface StrategyRetrieveDTO extends StrategyCreateDTO {
  uuid: string;
}
