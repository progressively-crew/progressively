import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { HasWebhookAccessGuard } from './guards/hasWebhookAccess';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhookService: WebhooksService) {}

  @Delete(':webhookId')
  @UseGuards(HasWebhookAccessGuard)
  @UseGuards(JwtAuthGuard)
  deleteSchedule(@Param('webhookId') webhookId: string) {
    return this.webhookService.deleteWebhook(webhookId);
  }
}
