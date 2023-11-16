import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

export const verifyAuthGuard = (
  app: INestApplication,
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
) => {
  return request(app.getHttpServer())
    [method](url)
    .set(
      'Authorization',
      `Bearer fezofhoezhfozjefokgokrpegkpgkprekgzprkgpekzgpekrgpke`,
    )
    .expect(401)
    .expect({
      statusCode: 401,
      message: 'Unauthorized',
    });
};
