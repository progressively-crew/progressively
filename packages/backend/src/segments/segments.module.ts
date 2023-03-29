import { Module } from '@nestjs/common';
import { SegmentsService } from './segments.service';
import { DatabaseModule } from '../database/database.module';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { SegmentsController } from './segments.controller';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { WebsocketModule } from '../websocket/websocket.module';

@Module({
  imports: [WebsocketModule, DatabaseModule, ActivityLogModule],
  providers: [SegmentsService, ActivityLogService],
  controllers: [SegmentsController],
})
export class SegmentsModule {}
