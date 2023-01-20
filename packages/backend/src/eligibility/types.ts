import * as Joi from 'joi';
import { ComparatorEnum } from '../shared/utils/comparators/types';

export class EligibilityUpdateDTO {
  uuid: string;
  fieldName: string;
  fieldComparator: ComparatorEnum;
  fieldValue: string;
}

export class EligibilityCreateDTO {
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
  uuid: Joi.string().required(),
  fieldName: Joi.string().required(),
  fieldComparator: Joi.string()
    .valid(ComparatorEnum.Equals, ComparatorEnum.Contains)
    .required(),
  fieldValue: Joi.string().required(),
});
