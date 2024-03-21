import * as Joi from 'joi';

export const SdkHitAnalyticsSchema = Joi.array().items({
  name: Joi.string().required(),
  url: Joi.string(),
  data: Joi.any(),
  referer: Joi.string(),
  viewportWidth: Joi.number(),
  viewportHeight: Joi.number(),
  posX: Joi.number(),
  posY: Joi.number(),
  clientKey: Joi.string(),
  secretKey: Joi.string(),
  domain: Joi.string(),
  visitorId: Joi.string(),
});
