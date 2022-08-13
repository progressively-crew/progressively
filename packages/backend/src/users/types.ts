export interface User {
  uuid: string;
  fullname: string;
  email: string;
  password: string;
  activationToken: string | null;
  status: string;
}
