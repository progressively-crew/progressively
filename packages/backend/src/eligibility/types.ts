import * as Joi from 'joi';

export enum ComparatorEnum {
  Equals = 'eq',
  NotEquals = 'neq',
  Contains = 'contains',
}

export class EligibilityCreationDTO {
  name: string;
  fieldName?: string;
  fieldComparator?: ComparatorEnum;
  fieldValue?: string;
}

export const EligibilitySchema = Joi.object({
  name: Joi.string().required(),
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
