import { Inject, Injectable } from '@nestjs/common';
import { ClickHouseClient, Tables } from '@progressively/database';
import { QueuedEventHit } from '../sdk/types';
import { Timeframe } from './types';

@Injectable()
export class EventsService {
  constructor(
    @Inject('ClickhouseService') private readonly clickhouse: ClickHouseClient,
  ) {}

  bulkAddEvents(
    events: Array<QueuedEventHit>,
    projectId: string,
    sessionUuid: string,
  ) {
    const eventsToStore = events.map((ev) => ({
      date: new Date(),
      name: ev.name,
      visitorId: ev.visitorId,
      browser: ev.browser,
      os: ev.os,
      url: ev.url,
      referer: ev.referer,
      data: ev.data
        ? typeof ev.data === 'object'
          ? JSON.stringify(ev.data)
          : String(ev.data)
        : null,
      projectUuid: projectId,
      sessionUuid,
      viewportHeight: ev.viewportHeight,
      viewportWidth: ev.viewportWidth,
    }));

    return this.clickhouse.insert({
      table: Tables.Events,
      values: eventsToStore,
      format: 'JSONEachRow',
      clickhouse_settings: {
        // Allows to insert serialized JS Dates (such as '2023-12-06T10:54:48.000Z')
        date_time_input_format: 'best_effort',
      },
    });
  }

  async getPageViews(projectId: string, timeframe: Timeframe) {
    const resultSet = await this.clickhouse.query({
      query: `SELECT count() AS pageViews
      FROM events
      WHERE date >= now() - INTERVAL ${timeframe} DAY
      AND projectUuid = '${projectId}'`,
      format: 'JSONEachRow',
    });

    const dataset: Array<{ pageViews: string }> = await resultSet.json();

    if (dataset.length === 1) {
      return Number(dataset[0].pageViews);
    }

    return 0;
  }

  async getUniqueVisitors(projectId: string, timeframe: Timeframe) {
    const resultSet = await this.clickhouse.query({
      query: `SELECT count(DISTINCT visitorId) AS uniqueVisitors
      FROM events
      WHERE date >= now() - INTERVAL ${timeframe} DAY
      AND projectUuid = '${projectId}';`,
      format: 'JSONEachRow',
    });

    const dataset: Array<{ uniqueVisitors: string }> = await resultSet.json();

    if (dataset.length === 1) {
      return Number(dataset[0].uniqueVisitors);
    }

    return 0;
  }

  async getByField(
    projectId: string,
    timeframe: Timeframe,
    field: 'browser' | 'os' | 'referer' | 'url',
  ) {
    const resultSet = await this.clickhouse.query({
      query: `SELECT  ${field}, count() AS pageViews
      FROM events
      WHERE date >= now() - INTERVAL ${timeframe} DAY
      AND projectUuid = '${projectId}'
      AND isNotNull(${field})
      GROUP BY ${field}
      ORDER BY pageViews DESC;
      `,
      format: 'JSONEachRow',
    });

    const dataset: Array<{ pageViews: string; [key: string]: string }> =
      await resultSet.json();

    return dataset;
  }

  async getByViewport(projectId: string, timeframe: Timeframe) {
    const resultSet = await this.clickhouse.query({
      query: `SELECT
        viewportWidth,
        viewportHeight,
        count() AS pageViews
      FROM events
      WHERE date >= now() - INTERVAL ${timeframe} DAY
      AND projectUuid = '${projectId}'
      AND isNotNull(viewportWidth)
      AND isNotNull(viewportHeight)
      GROUP BY
          viewportWidth,
          viewportHeight
      ORDER BY pageViews DESC;
      `,
      format: 'JSONEachRow',
    });

    const dataset: Array<{
      pageViews: string;
      viewportWidth: number;
      viewportHeight: number;
    }> = await resultSet.json();

    return dataset;
  }
}
