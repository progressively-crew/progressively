import { Injectable, NestMiddleware, Logger, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const startDate = Date.now();

    response.on('finish', () => {
      const endDate = Date.now();
      const userAgent = request.get('user-agent') || '';
      const { method, ip } = request;

      const domain = request.headers['origin'];
      const { statusCode, statusMessage } = response;
      const contentLength = response.get('content-length');

      this.logger.log({
        level: 'info',
        context: 'http',
        method,
        url: request.url.toString(),
        domain,
        statusCode,
        statusMessage,
        contentLength,
        userAgent,
        ip,
        duration: endDate - startDate,
      });
    });

    next();
  }
}
