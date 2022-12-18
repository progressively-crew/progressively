export const Constants = {
  BackendUrl: process.env.BACKEND_URL || "http://localhost:4000",
  StartMockServer: process.env.START_MOCK_SERVER,
  SessionSecret: process.env.SESSION_SECRET || "abcd",
  NodeEnv: process.env.NODE_ENV,
  OktaIssuer: process.env.OKTA_ISSUER,
  OktaClientId: process.env.OKTA_CLIENT_ID,
  AllowRegistration: process.env.ALLOW_REGISTRATION || "true",
};
