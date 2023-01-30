import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ActivityLogService } from './activity-log.service';

@Module({
  imports: [DatabaseModule],
  providers: [ActivityLogService],
})
export class ActivityLogModule {}
