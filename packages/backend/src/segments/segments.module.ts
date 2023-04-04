import { Module } from '@nestjs/common';
import { SegmentsService } from './segments.service';
import { DatabaseModule } from '../database/database.module';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { SegmentsController } from './segments.controller';
import { WebsocketModule } from '../websocket/websocket.module';
import { RuleModule } from '../rule/rule.module';

@Module({
  imports: [WebsocketModule, DatabaseModule, ActivityLogModule, RuleModule],
  providers: [SegmentsService],
  controllers: [SegmentsController],
  exports: [SegmentsService],
})
export class SegmentsModule {}
