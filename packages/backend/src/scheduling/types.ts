import * as Joi from 'joi';
import { FlagStatus } from '../flags/flags.status';

export interface SchedulingCreationDTO {
  timestamp: number;
  rolloutPercentage: number;
  status: FlagStatus;
}

export const SchedulingSchema = Joi.object({
  timestamp: Joi.number().min(0).required(),
  status: Joi.string()
    .valid(FlagStatus.ACTIVATED, FlagStatus.NOT_ACTIVATED)
    .required(),
  rolloutPercentage: Joi.number().integer().min(0).max(100).required(),
});
