import * as Joi from 'joi';
import { ComparatorEnum } from '../shared/utils/comparators/types';

export class StrategyCreationDTO {
  fieldName: string;
  fieldComparator: ComparatorEnum;
  fieldValue: string;
  valueToServeType: string;
  valueToServe: string;
}

export enum StrategyValueToServe {
  Boolean = 'Boolean',
  String = 'String',
}

export const StrategySchema = Joi.object({
  fieldName: Joi.string().required(),
  fieldComparator: Joi.string()
    .valid(ComparatorEnum.Equals, ComparatorEnum.Contains)
    .required(),
  fieldValue: Joi.string().required(),
  valueToServeType: Joi.string()
    .valid(StrategyValueToServe.Boolean, StrategyValueToServe.String)
    .required(),
  valueToServe: Joi.string().required(),
});
