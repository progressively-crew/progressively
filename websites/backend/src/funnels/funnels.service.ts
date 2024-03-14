import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateFunnelEntryDTO } from './funnels.dto';

@Injectable()
export class FunnelsService {
  constructor(private prisma: PrismaService) {}

  createFunnel(
    projectId: string,
    funnelName: string,
    funnelEntries: Array<CreateFunnelEntryDTO>,
  ) {
    return this.prisma.funnel.create({
      data: {
        projectUuid: projectId,
        name: funnelName,
        funnelEntries: {
          createMany: {
            data: funnelEntries.map((funnelEntry) => ({
              flagUuid: funnelEntry.flagUuid || null,
              eventName: funnelEntry.eventName || null,
              flagVariant: funnelEntry.variant || null,
              eventValue: funnelEntry.pageViewUrl || null,
            })),
          },
        },
      },
    });
  }
}
