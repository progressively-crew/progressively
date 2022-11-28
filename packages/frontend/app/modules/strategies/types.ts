export enum ComparatorEnum {
  Equals = "eq",
  Contains = "contains",
}

export interface AdditionalAudienceCreateDTO {
  fieldName: string;
  fieldComparator: ComparatorEnum;
  fieldValue: string;
  valueToServeType: string;
  valueToServe: string;
}

export interface AdditionalAudienceRetrieveDTO
  extends AdditionalAudienceCreateDTO {
  uuid: string;
}

export enum StrategyValueToServe {
  Boolean = "Boolean",
  String = "String",
  Variant = "Variant",
}
