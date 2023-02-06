import { Module } from '@nestjs/common';
import { WebsocketModule } from '../websocket/websocket.module';
import { DatabaseModule } from '../database/database.module';
import { SchedulingController } from './scheduling.controller';
import { SchedulingService } from './scheduling.service';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { ActivityLogService } from '../activity-log/activity-log.service';

@Module({
  imports: [DatabaseModule, WebsocketModule, ActivityLogModule],
  controllers: [SchedulingController],
  providers: [SchedulingService, ActivityLogService],
})
export class SchedulingModule {}
