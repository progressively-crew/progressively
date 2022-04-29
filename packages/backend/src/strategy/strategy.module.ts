import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StrategyController } from './strategy.controller';
import { StrategyService } from './strategy.service';
import { FlagsService } from '../flags/flags.service';

@Module({
  controllers: [StrategyController],
  providers: [PrismaService, StrategyService, FlagsService],
  exports: [StrategyService],
})
export class StrategyModule {}
