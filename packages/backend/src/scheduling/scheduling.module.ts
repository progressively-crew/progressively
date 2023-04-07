import { Module } from '@nestjs/common';
import { WebsocketModule } from '../websocket/websocket.module';
import { DatabaseModule } from '../database/database.module';
import { SchedulingController } from './scheduling.controller';
import { SchedulingService } from './scheduling.service';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { FlagsService } from '../flags/flags.service';

@Module({
  imports: [DatabaseModule, WebsocketModule, ActivityLogModule],
  controllers: [SchedulingController],
  providers: [SchedulingService, FlagsService],
  exports: [SchedulingService],
})
export class SchedulingModule {}
