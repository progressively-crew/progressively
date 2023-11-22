import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron() {
    this.logger.log({
      level: 'info',
      context: 'Cron',
      message: 'Cleanup events kicked',
    });

    const date = new Date();
    date.setDate(date.getDate() - 90);

    await this.prisma.flagHit.deleteMany({
      where: {
        date: {
          lte: date,
        },
      },
    });

    const date2 = new Date();
    date2.setDate(date2.getDate() - 30);
    await this.prisma.activityLog.deleteMany({
      where: {
        utc: {
          lte: date2,
        },
      },
    });
  }
}
