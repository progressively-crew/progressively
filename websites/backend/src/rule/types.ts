import { Segment } from '../segment/types';
import { ComparatorEnum } from './comparators/types';

export interface RuleType {
  fieldName: string;
  fieldComparator: ComparatorEnum;
  fieldValue: string;
  segmentUuid?: string;
  segment?: Segment;
}

export type RuleUpdateDto = {
  fieldName?: string;
  fieldComparator?: ComparatorEnum;
  fieldValue?: string;
  segmentUuid?: string;
};

export type FieldRecord = Record<string, string | number | boolean>;
