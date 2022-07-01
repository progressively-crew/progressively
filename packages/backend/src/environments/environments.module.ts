import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EnvironmentsService } from './environments.service';
import { EnvironmentsController } from './environments.controller';
import { FlagsService } from '../flags/flags.service';
import { AbService } from '../ab/ab.service';

@Module({
  controllers: [EnvironmentsController],
  providers: [PrismaService, EnvironmentsService, FlagsService, AbService],
  exports: [EnvironmentsService],
})
export class EnvironmentsModule {}
