import * as Joi from 'joi';

export interface SegmentCreationDTO {
  name: string;
}

export const SegmentSchema = Joi.object({
  name: Joi.string()
  .required(),
});
