export type AuthCredentials = {
  email: string;
  password: string;
};

export interface OktaConfig {
  issuer: string;
  clientId: string;
  isOktaActivated: boolean;
}
