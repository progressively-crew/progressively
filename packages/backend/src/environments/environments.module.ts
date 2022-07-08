import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EnvironmentsService } from './environments.service';
import { EnvironmentsController } from './environments.controller';
import { FlagsService } from '../flags/flags.service';
import { AbService } from '../ab/ab.service';
import { StrategyService } from '../strategy/strategy.service';

@Module({
  controllers: [EnvironmentsController],
  providers: [
    PrismaService,
    EnvironmentsService,
    FlagsService,
    AbService,
    StrategyService,
  ],
  exports: [EnvironmentsService],
})
export class EnvironmentsModule {}
