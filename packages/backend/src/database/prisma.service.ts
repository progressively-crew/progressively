import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Inject,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super({
      log: [
        { level: 'warn', emit: 'event' },
        { level: 'info', emit: 'event' },
        { level: 'error', emit: 'event' },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      const before = Date.now();

      try {
        const result = await next(params);

        const after = Date.now();

        this.logger.log({
          level: 'info',
          context: 'Prisma',
          model: params.model,
          action: params.action,
          duration: after - before,
        });

        return result;
      } catch (e) {
        const after = Date.now();

        this.logger.log({
          error: e.message,
          level: 'error',
          context: 'Prisma',
          model: params.model,
          action: params.action,
          duration: after - before,
        });

        throw e;
      }
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
