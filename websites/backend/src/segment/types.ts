import * as Joi from 'joi';
import { RuleType, RuleUpdateDto } from '../rule/types';
import { ComparatorEnum } from '../rule/comparators/types';

export const SegmentUpsertDTOSchema = Joi.array().items(
  Joi.object({
    uuid: Joi.string(),
    name: Joi.string().required(),
    segmentRules: Joi.array().items(
      Joi.object({
        fieldName: Joi.string().allow(''),
        fieldComparator: Joi.string()
          .allow('')
          .valid(ComparatorEnum.Contains, ComparatorEnum.Equals),
        fieldValue: Joi.string().allow(''),
      }),
    ),
  }),
);

export interface SegmentUpsertDTO {
  uuid?: string;
  name: string;
  segmentRules: Array<RuleUpdateDto>;
}

export interface SegmentRuleType {
  uuid: string;
  fieldName: string;
  fieldComparator: ComparatorEnum;
  fieldValue: string;
}

export interface Segment {
  uuid: string;
  name: string;
  segmentRules: Array<SegmentRuleType>;
}
