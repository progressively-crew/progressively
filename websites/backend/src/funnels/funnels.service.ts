import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Funnel, FunnelChart } from './funnels.dto';

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

    let previousVisitors: Array<string> = [];
    const visitorIdWhere =
      previousVisitors.length > 0
        ? {
            visitorId: {
              in: previousVisitors,
            },
          }
        : {};

    for (const funnelEntry of funnelEntries) {
      if (funnelEntry.flagUuid) {
        const flagHits = await this.prisma.flagHit.findMany({
          where: {
            flagEnvironmentFlagId: funnelEntry.flagUuid,
            date: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
            ...visitorIdWhere,
          },
        });

        previousVisitors = flagHits.map((fh) => fh.visitorId);

        funnelStats.push({
          event: funnelEntry.flagVariant,
          count: flagHits.length,
        });
      } else {
        const events = await this.prisma.event.findMany({
          where: {
            name: funnelEntry.eventName,
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
