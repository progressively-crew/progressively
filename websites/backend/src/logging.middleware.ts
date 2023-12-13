import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const startDate = Date.now();

    response.on('finish', () => {
      const endDate = Date.now();
      const userAgent = request.get('user-agent') || '';
      const { method, ip, originalUrl } = request;

      const domain = request.get('host');
      const { statusCode, statusMessage } = response;
      const contentLength = response.get('content-length');

      this.logger.log({
        method,
        url: originalUrl,
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
