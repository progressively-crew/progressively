export const jwtConstants = () => ({
  AccessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  RefreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  RefreshTokenExpire: parseInt(process.env.REFRESH_TOKEN_EXPIRES),
});
