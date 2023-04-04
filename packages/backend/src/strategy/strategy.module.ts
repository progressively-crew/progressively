import { Module } from '@nestjs/common';
import { StrategyController } from './strategy.controller';
import { StrategyService } from './strategy.service';
import { DatabaseModule } from '../database/database.module';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { FlagsModule } from '../flags/flags.module';

@Module({
  imports: [DatabaseModule, ActivityLogModule, FlagsModule],
  controllers: [StrategyController],
  providers: [StrategyService],
  exports: [StrategyService],
})
export class StrategyModule {}
