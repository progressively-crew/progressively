import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateFunnelEntryDTO } from './funnels.dto';
import { Timeframe } from '../events/types';
import { EventsService } from '../events/events.service';
import { Funnel, FunnelEntry } from '@progressively/database';

type FunnelsData = {
  uuid: string;
  name: string;
  funnelsEntries: Array<{ uuid: string; name: string; count: number }>;
};

@Injectable()
export class FunnelsService {
  constructor(
    private prisma: PrismaService,
    private eventService: EventsService,
  ) {}

  async resolveFunnel(
    projectId: string,
    funnel: Funnel & { funnelEntries: Array<FunnelEntry> },
    timeframe: Timeframe,
  ) {
    const funnelData: FunnelsData = {
      uuid: funnel.uuid,
      name: funnel.name,
      funnelsEntries: [],
    };

    let visitorIds: Array<{ visitorId: string }> = [];

    for (const funnelEntry of funnel.funnelEntries) {
      const funnelEntryVisitorIds =
        await this.eventService.getFunnelEntryVisitorIds(
          funnelEntry,
          projectId,
          visitorIds,
          timeframe,
        );

      visitorIds = funnelEntryVisitorIds;

      funnelData.funnelsEntries.push({
        uuid: funnelEntry.uuid,
        name: funnelEntry.flagVariant || funnelEntry.eventName,
        count: visitorIds.length,
      });
    }

    return funnelData;
  }

  async resolveFunnels(projectId: string, timeframe: Timeframe) {
    const funnels = await this.prisma.funnel.findMany({
      where: {
        projectUuid: projectId,
      },
      include: {
        funnelEntries: true,
      },
    });

    const promises = funnels.map((funnel) =>
      this.resolveFunnel(projectId, funnel, timeframe),
    );

    const funnelsData: Array<FunnelsData> = await Promise.all(promises);
    return funnelsData;
  }

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

  deleteFunnel(funnelId: string) {
    return this.prisma.$transaction([
      this.prisma.funnelEntry.deleteMany({
        where: {
          funnelUuid: funnelId,
        },
      }),

      this.prisma.funnel.deleteMany({
        where: {
          uuid: funnelId,
        },
      }),
    ]);
  }
}
