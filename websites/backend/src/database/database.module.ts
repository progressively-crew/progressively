import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { getClient } from '@progressively/database';

@Module({
  exports: [PrismaService],
  providers: [
    PrismaService,
    {
      provide: 'ClickhouseService',
      useFactory: () => getClient(),
    },
  ],
})
export class DatabaseModule {}
