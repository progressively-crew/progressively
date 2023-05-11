import * as Joi from 'joi';

export const RegistrationSchema = Joi.object({
  fullname: Joi.string().required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});

export class UserCreationDTO {
  email: string;
  fullname: string;
  password: string;
}

export class LoginDTO {
  email: string;
  password: string;
}

export const ResetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

export const ChangePasswordSchema = Joi.object({
  confirmationPassword: Joi.string().min(8).required(),
  password: Joi.string().min(8).required(),
});

export const ChangeFullnameSchema = Joi.object({
  fullname: Joi.string().min(1).required(),
});

export const PlanSchema = Joi.object({
  projectCount: Joi.number().min(1).max(10).required(),
  envCount: Joi.number().min(1).max(10).required(),
  evalCount: Joi.number()
    .valid(10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000)
    .required(),
});

export interface OktaConfig {
  issuer: string;
  clientId: string;
  isOktaActivated: boolean;
}

export enum AuthProviders {
  Default = 'Default',
  Okta = 'Okta',
}
