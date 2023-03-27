export interface RuleType {
  fieldName: string;
  fieldComparator: ComparatorEnum;
  fieldValue: string;
}

export enum ComparatorEnum {
  Equals = "eq",
  Contains = "contains",
}
