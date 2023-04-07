import { Module } from '@nestjs/common';
import { FlagsService } from './flags.service';
import { FlagsController } from './flags.controller';
import { EnvironmentsModule } from '../environments/environments.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { DatabaseModule } from '../database/database.module';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { RuleModule } from '../rule/rule.module';
import { SchedulingModule } from '../scheduling/scheduling.module';
import { WebhooksModule } from '../webhooks/webhooks.module';

@Module({
  imports: [
    EnvironmentsModule,
    WebsocketModule,
    DatabaseModule,
    ActivityLogModule,
    RuleModule,
    SchedulingModule,
    WebhooksModule,
    ActivityLogModule,
  ],
  providers: [FlagsService],
  controllers: [FlagsController],
  exports: [FlagsService],
})
export class FlagsModule {}
