import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export class DatabaseModule {}
