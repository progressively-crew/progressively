import { ComparatorEnum } from './comparators/types';

export interface RuleType {
  fieldName: string;
  fieldComparator: ComparatorEnum;
  fieldValue: string;
}
