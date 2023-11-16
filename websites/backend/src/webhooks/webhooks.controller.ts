import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { HasWebhookAccessGuard } from './guards/hasWebhookAccess';
import { WebhooksService } from './webhooks.service';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { UserId } from '../users/users.decorator';

@Controller('webhooks')
export class WebhooksController {
  constructor(
    private readonly webhookService: WebhooksService,
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Delete(':webhookId')
  @UseGuards(HasWebhookAccessGuard)
  @UseGuards(JwtAuthGuard)
  async deleteSchedule(
    @UserId() userId: string,
    @Param('webhookId') webhookId: string,
  ) {
    const deletedWebhook = await this.webhookService.deleteWebhook(webhookId);

    await this.activityLogService.register({
      userId,
      flagId: deletedWebhook.flagEnvironmentFlagId,
      envId: deletedWebhook.flagEnvironmentEnvironmentId,
      concernedEntity: 'flag',
      type: 'delete-webhook',
      data: JSON.stringify(deletedWebhook),
    });

    return deletedWebhook;
  }
}
