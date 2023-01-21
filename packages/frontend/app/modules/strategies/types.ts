export enum ComparatorEnum {
  Equals = "eq",
  Contains = "contains",
}

export interface AdditionalAudienceUpdateDTO {
  uuid?: string;
  fieldName: string;
  fieldComparator: ComparatorEnum;
  fieldValue: string;
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
