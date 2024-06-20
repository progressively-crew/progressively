import { Module } from '@nestjs/common';
import { SegmentService } from './segment.service';
import { SegmentController } from './segment.controller';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [SegmentService],
  controllers: [SegmentController],
  imports: [DatabaseModule, ActivityLogModule],
})
export class SegmentModule {}
