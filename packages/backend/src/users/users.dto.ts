export interface UserRetrieveDTO {
  uuid: string;
  fullname: string;
  email: string;
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
