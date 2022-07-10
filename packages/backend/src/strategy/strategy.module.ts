import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StrategyController } from './strategy.controller';
import { StrategyService } from './strategy.service';
import { FlagsModule } from '../flags/flags.module';

@Module({
  imports: [FlagsModule],
  controllers: [StrategyController],
  providers: [PrismaService, StrategyService],
  exports: [StrategyService],
})
export class StrategyModule {}
