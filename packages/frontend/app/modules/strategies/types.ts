import { RuleType } from "../rules/types";

export interface AdditionalAudienceUpdateDTO {
  uuid?: string;
  rule: RuleType;
  valueToServeType: string;
  valueToServe: string;
}

export interface AdditionalAudienceRetrieveDTO
  extends AdditionalAudienceUpdateDTO {
  uuid: string;
}

export enum StrategyValueToServe {
  Boolean = "Boolean",
  String = "String",
  Variant = "Variant",
}
