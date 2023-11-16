import { RuleType } from "../rules/types";

export interface Segment {
  uuid: string;
  name: string;
  rule: Array<RuleType & { uuid: string }>;
}
