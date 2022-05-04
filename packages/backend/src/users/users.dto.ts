export interface UserRetrieveDTO {
  uuid: string;
  fullname: string;
  email: string;
}

export interface UserChangeFullnameDTO {
  fullname: string;
}
