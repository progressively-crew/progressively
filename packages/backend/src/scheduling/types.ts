import * as Joi from 'joi';
import { FlagStatus } from '../flags/flags.status';

export enum SchedulingType {
  UpdatePercentage = 'UpdatePercentage',
  UpdateVariantPercentage = 'UpdateVariantPercentage',
}

export interface SchedulingUpdatePercentageData {
  rolloutPercentage: number;
}

export type SchedulingCreationDTO = {
  utc: string;
  rolloutPercentage: number;
  status: FlagStatus;
} & (
  | {
      type: SchedulingType.UpdatePercentage;
      data: SchedulingUpdatePercentageData;
    }
  | { type: SchedulingType.UpdateVariantPercentage; data: any }
);

export const SchedulingSchema = Joi.object({
  utc: Joi.date().required(),
  status: Joi.string()
    .valid(FlagStatus.ACTIVATED, FlagStatus.NOT_ACTIVATED)
    .required(),

  type: Joi.string().valid(SchedulingType.UpdatePercentage),

  data: Joi.any().when('type', {
    is: SchedulingType.UpdatePercentage,
    then: Joi.object({
      rolloutPercentage: Joi.number().integer().min(0).max(100).required(),
    }).required(),
  }),
});
