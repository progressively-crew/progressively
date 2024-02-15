import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateFunnelEntryDTO, Funnel, FunnelChart } from './funnels.dto';

@Injectable()
export class FunnelsService {
  constructor(private prisma: PrismaService) {}

  async resolveFunnelChart(
    projectUuid: string,
    funnel: Funnel,
    startDate: string,
    endDate: string,
  ): Promise<FunnelChart> {
    const funnelEntries = await this.prisma.funnelEntry.findMany({
      where: {
        funnelUuid: funnel.uuid,
      },
      include: {
        flag: true,
      },
    });

    const funnelStats: FunnelChart['funnelStats'] = [];

    let i = 0;
    let previousVisitors: Array<string> = [];

    for (const funnelEntry of funnelEntries) {
      const shouldSkipRequest = i > 0 && previousVisitors.length === 0;

      const visitorIdWhere =
        previousVisitors.length > 0
          ? {
              visitorId: {
                in: previousVisitors,
              },
            }
          : {};

      if (funnelEntry.flag) {
        const valueResolved = funnelEntry.flagVariant || 'true';

        const flagHits = shouldSkipRequest
          ? []
          : await this.prisma.flagHit.findMany({
              where: {
                flagUuid: funnelEntry.flagUuid,
                valueResolved,
                date: {
                  gte: new Date(startDate),
                  lte: new Date(endDate),
                },
                ...visitorIdWhere,
              },
            });

        previousVisitors = flagHits.map((fh) => fh.visitorId);

        funnelStats.push({
          event: `${funnelEntry.flag.name} (${valueResolved})`,
          count: flagHits.length,
        });
      } else {
        const events = shouldSkipRequest
          ? []
          : await this.prisma.event.findMany({
              where: {
                projectUuid: projectUuid,
                name: funnelEntry.eventName,
                url: funnelEntry.eventValue || undefined,
                date: {
                  gte: new Date(startDate),
                  lte: new Date(endDate),
                },
                ...visitorIdWhere,
              },
            });

        previousVisitors = events.map((fh) => fh.visitorId);

        funnelStats.push({
          event: funnelEntry.eventName,
          count: events.length,
        });
      }

      i++;
    }

    const funnelEntry: FunnelChart = {
      funnel,
      funnelStats,
    };

    return funnelEntry;
  }

  async buildFunnelCharts(
    projectId: string,
    funnels: Array<Funnel>,
    startDate: string,
    endDate: string,
  ): Promise<Array<FunnelChart>> {
    const funnelChartsPromises: Array<Promise<FunnelChart>> = [];

    for (const funnel of funnels) {
      funnelChartsPromises.push(
        this.resolveFunnelChart(projectId, funnel, startDate, endDate),
      );
    }

    return Promise.all(funnelChartsPromises);
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
}
