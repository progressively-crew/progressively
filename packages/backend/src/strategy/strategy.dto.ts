import * as Joi from 'joi';
import { ComparatorEnum } from '../shared/utils/comparators/types';

export class StrategyCreationDTO {
  name: string;
  fieldName?: string;
  fieldComparator?: ComparatorEnum;
  fieldValue?: string;
}

export const StrategySchema = Joi.object({
  name: Joi.string().required(),
  fieldName: Joi.string().required(),
  fieldComparator: Joi.string()
    .valid(ComparatorEnum.Equals, ComparatorEnum.Contains)
    .required(),
  fieldValue: Joi.string().required(),
});
