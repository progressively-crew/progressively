import { ComparatorEnum } from './comparators/types';

export interface RuleType {
  fieldName: string;
  fieldComparator: ComparatorEnum;
  fieldValue: string;
}

export type RuleUpdateDto = {
  fieldName?: string;
  fieldComparator?: ComparatorEnum;
  fieldValue?: string;
};

export type FieldRecord = Record<string, string | number | boolean>;
