import * as Joi from 'joi';
import { ComparatorEnum } from '../shared/utils/comparators/types';

export class EligibilityCreationDTO {
  fieldName: string;
  fieldComparator: ComparatorEnum;
  fieldValue: string;
}

export class Eligibility {
  uuid: string;
  fieldName: string;
  fieldComparator: ComparatorEnum;
  fieldValue: string;
  flagEnvironmentFlagId: string;
  flagEnvironmentEnvironmentId: string;
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
