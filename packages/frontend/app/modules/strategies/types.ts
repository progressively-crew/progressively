export enum ComparatorEnum {
  Equals = "eq",
  Contains = "contains",
}

export interface StrategyCreateDTO {
  fieldName?: string;
  fieldComparator?: ComparatorEnum;
  fieldValue?: string;
}

export interface StrategyRetrieveDTO extends StrategyCreateDTO {
  uuid: string;
}
