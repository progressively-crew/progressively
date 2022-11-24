import * as Joi from 'joi';

export enum ComparatorEnum {
  Equals = 'eq',
  NotEquals = 'neq',
  Contains = 'contains',
}

export class EligibilityCreationDTO {
  fieldName: string;
  fieldComparator: ComparatorEnum;
  fieldValue: string;
}

export const EligibilitySchema = Joi.object({
  fieldName: Joi.string().required(),
  fieldComparator: Joi.string()
    .valid(
      ComparatorEnum.Equals,
      ComparatorEnum.NotEquals,
      ComparatorEnum.Contains,
    )
    .required(),
  fieldValue: Joi.string().required(),
});
