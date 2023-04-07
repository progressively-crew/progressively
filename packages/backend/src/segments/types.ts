import * as Joi from 'joi';
import { RuleType } from '../rule/types';

export interface SegmentCreationDTO {
  name: string;
}

export interface Segment {
  name: string;
  rule: Array<RuleType>;
}

export const SegmentSchema = Joi.object({
  name: Joi.string().required(),
});
