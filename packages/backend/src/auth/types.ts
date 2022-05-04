import * as Joi from 'joi';

export const RegistrationSchema = Joi.object({
  fullname: Joi.string().required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});

export interface UserCreationDTO {
  email: string;
  fullname: string;
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
