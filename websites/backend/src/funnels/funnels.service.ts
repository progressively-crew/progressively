import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Funnel, FunnelChart } from './funnels.dto';
import { FunnelEntry } from '@progressively/database';

@Injectable()
export class FunnelsService {
  constructor(private prisma: PrismaService) {}

  async resolveFunnelChart(
    funnel: Funnel,
    startDate: string,
    endDate: string,
  ): Promise<FunnelChart> {
    const funnelEntries = await this.prisma.funnelEntry.findMany({
      where: {
        funnelUuid: funnel.uuid,
      },
    });

    const funnelStats: FunnelChart['funnelStats'] = [];

    for (const funnelEntry of funnelEntries) {
      if (funnelEntry.flagUuid) {
        const flagHits = await this.prisma.flagHit.count({
          where: {
            flagEnvironmentFlagId: funnelEntry.flagUuid,
            date: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          },
        });

        funnelStats.push({
          event: funnelEntry.flagVariant,
          count: flagHits,
        });
      } else {
        const events = await this.prisma.event.count({
          where: {
            name: funnelEntry.eventName,
            date: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          },
        });

        funnelStats.push({
          event: funnelEntry.eventName,
          count: events,
        });
      }
    }

    const funnelEntry: FunnelChart = {
      funnel,
      funnelStats,
    };

    return funnelEntry;
  }

  async buildFunnelCharts(
    funnels: Array<Funnel>,
    startDate: string,
    endDate: string,
  ): Promise<Array<FunnelChart>> {
    const funnelChartsPromises: Array<Promise<FunnelChart>> = [];

    for (const funnel of funnels) {
      funnelChartsPromises.push(
        this.resolveFunnelChart(funnel, startDate, endDate),
      );
    }

    return Promise.all(funnelChartsPromises);
  }
}
