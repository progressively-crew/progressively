import { Module } from '@nestjs/common';
import { SegmentsService } from './segments.service';
import { DatabaseModule } from '../database/database.module';
import { ActivityLogModule } from '../activity-log/activity-log.module';

@Module({
  imports: [DatabaseModule, ActivityLogModule],
  providers: [SegmentsService],
})
export class SegmentsModule {}
