import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { authenticate } from './authenticate';

export const createProject = async (
  app: INestApplication,
  projectName,
  domain?: string,
) => {
  const access_token = await authenticate(app);
  const response = await request(app.getHttpServer())
    .post('/projects')
    .set('Authorization', `Bearer ${access_token}`)
    .send({
      name: projectName,
      domain,
    });

  return [response, access_token] as const;
};
