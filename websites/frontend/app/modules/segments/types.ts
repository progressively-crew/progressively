import { ComparatorEnum } from "../rules/types";

export interface SegmentRule {
  uuid: string;
  fieldComparator: ComparatorEnum;
  fieldName: string;
  fieldValue: string;
  createdAt: string;
}

export interface Segment {
  uuid: string;
  name: string;
  createdAt: string;
  projectUuid: string;
  userUuid: string;
  segmentRules: Array<SegmentRule>;
}
