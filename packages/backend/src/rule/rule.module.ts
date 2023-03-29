import { Module } from '@nestjs/common';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { DatabaseModule } from '../database/database.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { ActivityLogService } from '../activity-log/activity-log.service';

@Module({
  imports: [DatabaseModule, WebsocketModule, ActivityLogModule],
  providers: [RuleService, ActivityLogService],
  controllers: [RuleController],
})
export class RuleModule {}
