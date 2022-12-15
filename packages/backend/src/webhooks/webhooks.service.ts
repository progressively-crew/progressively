import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { WebhookCreationDTO } from './types';

@Injectable()
export class WebhooksService {
  constructor(private prisma: PrismaService) {}

  deleteWebhook(uuid: string) {
    return this.prisma.webhook.deleteMany({
      where: {
        uuid,
      },
    });
  }

  listWebhooks(envId: string, flagId: string) {
    return this.prisma.webhook.findMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
    });
  }

  addWebhookToFlagEnv(
    envId: string,
    flagId: string,
    webhook: WebhookCreationDTO,
  ): Promise<any> {
    return this.prisma.webhook.create({
      data: {
        endpoint: webhook.endpoint,
        event: webhook.event,
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: envId,
      },
    });
  }

  async hasPermissionOnWebhook(
    webhookId: string,
    userId: string,
    roles?: Array<string>,
  ) {
    const flagOfProject = await this.prisma.userProject.findFirst({
      where: {
        userId,
        project: {
          environments: {
            some: {
              flagEnvironment: {
                some: { webhooks: { some: { uuid: webhookId } } },
              },
            },
          },
        },
      },
    });

    if (!flagOfProject) {
      return false;
    }

    if (!roles || roles.length === 0) {
      return true;
    }

    return roles.includes(flagOfProject.role);
  }
}
