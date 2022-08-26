import * as Joi from 'joi';
import { FlagStatus } from '../flags/flags.status';

export interface SchedulingCreationDTO {
  utc: string;
  rolloutPercentage: number;
  status: FlagStatus;
}

export const SchedulingSchema = Joi.object({
  utc: Joi.date().required(),
  status: Joi.string()
    .valid(FlagStatus.ACTIVATED, FlagStatus.NOT_ACTIVATED)
    .required(),
  rolloutPercentage: Joi.number().integer().min(0).max(100).required(),
});
