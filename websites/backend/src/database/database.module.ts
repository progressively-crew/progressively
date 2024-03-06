import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { getClient } from '@progressively/database';

@Module({
  providers: [
    PrismaService,
    {
      provide: 'ClickhouseService',
      useFactory: () => getClient(),
    },
  ],
  exports: [PrismaService, 'ClickhouseService'],
})
export class DatabaseModule {}
