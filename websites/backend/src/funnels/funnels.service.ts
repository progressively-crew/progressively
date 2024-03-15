import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateFunnelEntryDTO } from './funnels.dto';
import { Funnel, FunnelEntry } from '@progressively/database';

@Injectable()
export class FunnelsService {
  constructor(private prisma: PrismaService) {}

  resolveFunnels(funnel: Funnel & { funnelEntries: Array<FunnelEntry> }) {
    let query = ``;

    const withClauses = funnel.funnelEntries
      .map((funnelEntry, index) => {
        const table = funnelEntry.flagUuid ? 'flaghits' : 'events';
        const actualTable = index === 0 ? table : `step${index - 1}`;
        const whereClause = funnelEntry.flagUuid
          ? `flagUuid = '${funnelEntry.flagUuid}'`
          : `name = '${funnelEntry.eventName}'`;

        query +
          `WITH step${index} AS (
          SELECT visitorId
          FROM ${actualTable}
          WHERE ${whereClause}
        )`;
      })
      .join(',\n');

    const queries = funnel.funnelEntries
      .map((funnelEntry, index) => {
        return `SELECT count() FROM step${index}`;
      })
      .join('\nUNION ALL\n');

    const finalQuery = `${withClauses} ${queries}`;
    console.log(finalQuery);
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
