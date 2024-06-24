import { Segment } from "../segments/types";

export interface RuleType {
  fieldName: string;
  fieldComparator: ComparatorEnum;
  fieldValue: string;
}

export enum ComparatorEnum {
  Equals = "eq",
  Contains = "contains",
}

export type Rule = RuleType & { uuid: string; segment?: Segment };

export type RuleUpdateDto = {
  fieldName?: string;
  fieldComparator?: ComparatorEnum;
  fieldValue?: string;
};
