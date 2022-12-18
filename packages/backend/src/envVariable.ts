const safeNumber = (str: string, fallback: number) =>
  str ? parseInt(str) : fallback;

export const getEnvVars = () => ({
  DatabaseUrl: process.env.DATABASE_URL,
  RedisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  AccessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'abcd',
  RefreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'efgh',
  RefreshTokenExpire: safeNumber(process.env.REFRESH_TOKEN_EXPIRES, 84600),
  SmtpHost: process.env.SMTP_HOST,
  SmtpPort: process.env.SMTP_PORT,
  SmtpUser: process.env.SMTP_USER,
  SmtpPassword: process.env.SMTP_PASSWORD,
  FrontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  BackendUrl: process.env.BACKEND_URL || 'http://localhost:4000',
  SocketTimeout: safeNumber(process.env.SOCKET_TIMEOUT, 10000),
  AllowRegistration: process.env.ALLOW_REGISTRATION || 'true',
  ThrottlingTtl: safeNumber(process.env.THROTTLING_TTL, 60),
  ThrottlingLimit: safeNumber(process.env.THROTTLING_LIMIT, 10),
  OktaIssuer: process.env.OKTA_ISSUER,
  OktaClientId: process.env.OKTA_CLIENT_ID,
});
