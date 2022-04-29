import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EnvironmentsService } from './environments.service';
import { EnvironmentsController } from './environments.controller';
import { FlagsService } from '../flags/flags.service';

@Module({
  controllers: [EnvironmentsController],
  providers: [PrismaService, EnvironmentsService, FlagsService],
  exports: [EnvironmentsService],
})
export class EnvironmentsModule {}
