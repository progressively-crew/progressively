import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

export const authenticate = async (
  app: INestApplication,
  username = 'marvin.frachet@something.com',
  password = 'password',
) => {
  const {
    body: { access_token, refresh_token },
  } = await request(app.getHttpServer()).post('/auth/login').send({
    username,
    password,
  });

  expect(refresh_token).toBeTruthy();

  return access_token;
};
