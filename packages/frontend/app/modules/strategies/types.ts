export enum ComparatorEnum {
  Equals = "eq",
  Contains = "contains",
}

export interface AdditionalAudienceCreateDTO {
  fieldName?: string;
  fieldComparator?: ComparatorEnum;
  fieldValue?: string;
}

export interface AdditionalAudienceRetrieveDTO
  extends AdditionalAudienceCreateDTO {
  uuid: string;
}
