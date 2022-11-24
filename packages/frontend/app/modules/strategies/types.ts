export enum ComparatorEnum {
  Equals = "eq",
  Contains = "contains",
}

export interface StrategyCreateDTO {
  name: string;
  fieldName?: string;
  fieldComparator?: ComparatorEnum;
  fieldValue?: string;
}

export interface StrategyRetrieveDTO extends StrategyCreateDTO {
  uuid: string;
}
