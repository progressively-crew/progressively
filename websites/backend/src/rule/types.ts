import * as Joi from 'joi';
import { ComparatorEnum } from './comparators/types';
import { Segment } from '../segments/types';

export interface RuleType {
  fieldName: string;
  fieldComparator: ComparatorEnum;
  fieldValue: string;
  Segment?: Segment;
}

export type RuleUpdateDto = {
  fieldName?: string;
  fieldComparator?: ComparatorEnum;
  fieldValue?: string;
  segmentUuid?: string;
};

export const RuleSchema = Joi.object({
  fieldName: Joi.string().when('segmentUuid', {
    is: Joi.exist(),
    then: Joi.valid(null),
    otherwise: Joi.string().required(),
  }),
  fieldComparator: Joi.string().when('segmentUuid', {
    is: Joi.exist(),
    then: Joi.valid(null),
    otherwise: Joi.string()
      .valid(ComparatorEnum.Equals, ComparatorEnum.Contains)
      .required(),
  }),
  fieldValue: Joi.string().when('segmentUuid', {
    is: Joi.exist(),
    then: Joi.valid(null),
    otherwise: Joi.string().required(),
  }),
  segmentUuid: Joi.string().allow('').optional(),
});

export type FieldRecord = Record<string, string | number | boolean>;
