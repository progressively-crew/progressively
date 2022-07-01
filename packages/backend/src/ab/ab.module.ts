import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AbController } from './ab.controller';
import { AbService } from './ab.service';

@Module({
  controllers: [AbController],
  providers: [AbService, PrismaService],
  exports: [AbService],
})
export class AbModule {}
