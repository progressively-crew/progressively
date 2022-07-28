import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: any, response: any, next: NextFunction): void {
    const startDate = Date.now();

    response.on('finish', () => {
      const endDate = Date.now();
      const userAgent = request.headers['user-agent'] || '';
      const { method, originalUrl, ip } = request;
      const { statusCode, statusMessage } = response;

      const contentLength = response.getHeader('content-length');

      this.logger.log({
        method,
        url: originalUrl,
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
