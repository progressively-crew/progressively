import { Module } from '@nestjs/common';
import { StrategyController } from './strategy.controller';
import { StrategyService } from './strategy.service';
import { DatabaseModule } from '../database/database.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { RuleModule } from '../rule/rule.module';

@Module({
  imports: [DatabaseModule, WebsocketModule, ActivityLogModule, RuleModule],
  controllers: [StrategyController],
  providers: [StrategyService, ActivityLogService],
  exports: [StrategyService],
})
export class StrategyModule {}
