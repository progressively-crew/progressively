import * as Joi from 'joi';
export interface UserRetrieveDTO {
  uuid: string;
  fullname: string;
  email: string;
  trialEnd?: Date;
}

export class UserChangeFullnameDTO {
  fullname: string;
}

export class ForgotPasswordDTO {
  email: string;
}

export class ResetPasswordDTO {
  token: string;
  password: string;
}

export class ChangePasswordDTO {
  confirmationPassword: string;
  password: string;
}

export class PlanCreateDTO {
  evalCount: number;
}

export const PlanSchema = Joi.object({
  evalCount: Joi.number()
    .valid(10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000)
    .required(),
});
