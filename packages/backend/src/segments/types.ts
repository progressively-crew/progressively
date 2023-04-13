import * as Joi from 'joi';
import { RuleType } from '../rule/types';

export interface SegmentCreationDTO {
  name: string;
}

export interface Segment {
  uuid: string;
  name: string;
  createdAt: Date;
  rule: Array<RuleType>;
}

export const SegmentSchema = Joi.object({
  name: Joi.string().required(),
});
