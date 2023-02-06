import { Module } from '@nestjs/common';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { DatabaseModule } from '../database/database.module';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';

@Module({
  imports: [DatabaseModule, ActivityLogModule],
  controllers: [WebhooksController],
  providers: [WebhooksService, ActivityLogService],
})
export class WebhooksModule {}
