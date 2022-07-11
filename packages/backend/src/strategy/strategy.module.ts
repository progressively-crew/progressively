import { Module } from '@nestjs/common';
import { StrategyController } from './strategy.controller';
import { StrategyService } from './strategy.service';
import { FlagsModule } from '../flags/flags.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [FlagsModule, DatabaseModule],
  controllers: [StrategyController],
  providers: [StrategyService],
  exports: [StrategyService],
})
export class StrategyModule {}
