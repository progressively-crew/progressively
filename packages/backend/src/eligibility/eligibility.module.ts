import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { EligibilityService } from './eligibility.service';
import { EligibilityController } from './eligibility.controller';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { RuleModule } from '../rule/rule.module';

@Module({
  imports: [DatabaseModule, WebsocketModule, ActivityLogModule, RuleModule],
  providers: [EligibilityService, ActivityLogService],
  controllers: [EligibilityController],
  exports: [EligibilityService],
})
export class EligibilityModule {}
