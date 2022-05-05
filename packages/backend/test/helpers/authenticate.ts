import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

export const authenticate = async (
  app: INestApplication,
  username = 'marvin.frachet@something.com',
  password = 'password',
) => {
  const {
    body: { access_token },
    header,
  } = await request(app.getHttpServer()).post('/auth/login').send({
    username,
    password,
  });

  const refreshToken = header['set-cookie'].find((x) =>
    x.startsWith('refresh-token='),
  );

  expect(refreshToken).toBeTruthy();

  return access_token;
};
