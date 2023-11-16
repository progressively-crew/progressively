import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRetrieveDTO } from '../../users/users.dto';
import { WebhooksService } from '../webhooks.service';

@Injectable()
export class HasWebhookAccessGuard implements CanActivate {
  constructor(
    private readonly webhookService: WebhooksService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();

    const webhookId = req.params.webhookId;
    const user: UserRetrieveDTO = req.user;

    return this.webhookService.hasPermissionOnWebhook(
      webhookId,
      user.uuid,
      roles,
    );
  }
}
