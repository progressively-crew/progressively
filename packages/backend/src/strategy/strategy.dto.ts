import * as Joi from 'joi';
import { ComparatorEnum } from './types';

export class StrategyCreationDTO {
  name: string;
  strategyRuleType: 'default' | 'field' | 'pool';

  // only exists for the type of "field"
  fieldName?: string;
  fieldComparator?: ComparatorEnum;
  fieldValue?: string;
}

export const StrategySchema = Joi.object({
  name: Joi.string().required(),
  strategyRuleType: Joi.string().valid('default', 'field', 'pool').required(),

  fieldName: Joi.string().when('strategyRuleType', {
    switch: [{ is: 'field', then: Joi.required() }],
  }),
  fieldComparator: Joi.string()
    .valid(ComparatorEnum.Equals, ComparatorEnum.NotEquals)
    .when('strategyRuleType', {
      switch: [{ is: 'field', then: Joi.required() }],
    }),
  fieldValue: Joi.string().when('strategyRuleType', {
    switch: [{ is: 'field', then: Joi.required() }],
  }),
});
