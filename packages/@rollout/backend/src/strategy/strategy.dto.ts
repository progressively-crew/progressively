import * as Joi from 'joi';

export interface StrategyCreateDTO {
  name: string;
  strategyRuleType: 'default' | 'field' | 'pool';

  // only exists for the type of "field"
  fieldName?: string;
  fieldComparator?: 'eq';
  fieldValue?: string;

  activationType?: 'boolean' | 'percentage';

  // only exists for activation "percentage"
  rolloutPercentage?: number;
}

export const StrategySchema = Joi.object({
  name: Joi.string().required(),
  strategyRuleType: Joi.string().valid('default', 'field', 'pool').required(),
  activationType: Joi.string().valid('boolean', 'percentage'),

  fieldName: Joi.string().when('strategyRuleType', {
    switch: [{ is: 'field', then: Joi.required() }],
  }),
  fieldComparator: Joi.string()
    .valid('eq')
    .when('strategyRuleType', {
      switch: [{ is: 'field', then: Joi.required() }],
    }),
  fieldValue: Joi.string().when('strategyRuleType', {
    switch: [{ is: 'field', then: Joi.required() }],
  }),

  rolloutPercentage: Joi.number()
    .integer()
    .positive()
    .min(0)
    .max(100)
    .when('activationType', {
      switch: [{ is: 'percentage', then: Joi.required() }],
    }),
});
