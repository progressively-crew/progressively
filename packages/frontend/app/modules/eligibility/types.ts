import { RuleType } from "../rules/types";

export interface Eligibility {
  uuid: string;
  rule: RuleType;
  flagEnvironmentFlagId: string;
  flagEnvironmentEnvironmentId: string;
}

export interface UpsertEligibilityDTO {
  rule: RuleType;
  uuid?: string;
}
