import { Module } from '@nestjs/common';
import { FlagsService } from './flags.service';
import { FlagsController } from './flags.controller';
import { StrategyService } from '../strategy/strategy.service';
import { EnvironmentsModule } from '../environments/environments.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { DatabaseModule } from '../database/database.module';
import { SchedulingService } from '../scheduling/scheduling.service';
import { WebhooksService } from '../webhooks/webhooks.service';
import { EligibilityService } from '../eligibility/eligibility.service';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { SegmentsModule } from '../segments/segments.module';
import { SegmentsService } from '../segments/segments.service';
import { StrategyModule } from '../strategy/strategy.module';
import { RuleModule } from '../rule/rule.module';

@Module({
  imports: [
    EnvironmentsModule,
    WebsocketModule,
    DatabaseModule,
    ActivityLogModule,
    SegmentsModule,
    StrategyModule,
    RuleModule,
  ],
  providers: [
    FlagsService,
    StrategyService,
    SchedulingService,
    WebhooksService,
    EligibilityService,
    ActivityLogService,
    SegmentsService,
  ],
  controllers: [FlagsController],
  exports: [FlagsService],
})
export class FlagsModule {}
