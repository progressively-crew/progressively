export interface User {
  fullname: string;
  email: string;
  uuid: string;
}

export interface RegisterCredentials {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}
