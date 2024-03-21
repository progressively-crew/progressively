import { Inject, Injectable } from '@nestjs/common';
import { ClickHouseClient, Tables } from '@progressively/database';
import { QueuedEventHit } from '../sdk/types';
import { Timeframe } from './types';

@Injectable()
export class EventsService {
  constructor(
    @Inject('ClickhouseService') private readonly clickhouse: ClickHouseClient,
  ) {}

  bulkAddEvents(events: Array<QueuedEventHit>) {
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
      projectUuid: ev.projectUuid,
      sessionUuid: ev.sessionUuid,
      viewportHeight: ev.viewportHeight,
      viewportWidth: ev.viewportWidth,
      posX: ev.posX,
      posY: ev.posY,
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

  async getPageViews(
    projectId: string,
    timeframe: Timeframe,
    showPrevious?: boolean,
  ) {
    const whereClause = showPrevious
      ? `WHERE date >= now() - INTERVAL ${timeframe * 2} DAY
        AND date <= now() - INTERVAL ${timeframe} DAY`
      : `WHERE date >= now() - INTERVAL ${timeframe} DAY`;

    const resultSet = await this.clickhouse.query({
      query: `SELECT count() AS pageViews
      FROM events
      ${whereClause}
      AND projectUuid = '${projectId}'`,
      format: 'JSONEachRow',
    });

    const dataset: Array<{ pageViews: string }> = await resultSet.json();

    if (dataset.length === 1) {
      return Number(dataset[0].pageViews);
    }

    return 0;
  }

  async getUniqueVisitors(
    projectId: string,
    timeframe: Timeframe,
    showPrevious?: boolean,
  ) {
    const whereClause = showPrevious
      ? `WHERE date >= now() - INTERVAL ${timeframe * 2} DAY
      AND date <= now() - INTERVAL ${timeframe} DAY`
      : `WHERE date >= now() - INTERVAL ${timeframe} DAY`;

    const resultSet = await this.clickhouse.query({
      query: `SELECT count(DISTINCT visitorId) AS uniqueVisitors
      FROM events
      ${whereClause}
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
      query: `SELECT ${field}, CAST(count() AS Int32) AS pageViews
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
        CAST(count() AS Int32) AS pageViews
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

  async getPageViewsGroupedByDate(projectId: string, timeframe: Timeframe) {
    const resultSet = await this.clickhouse.query({
      query: `SELECT
        toDate(date) AS date,
        CAST(COUNT(*) AS Int32) AS count
      FROM events
      WHERE date >= now() - INTERVAL ${timeframe} DAY
      AND projectUuid = '${projectId}'
      AND name = 'Page View'
      GROUP BY date
      ORDER BY date;`,
      format: 'JSONEachRow',
    });

    const dataset: Array<{
      date: string;
      count: number;
    }> = await resultSet.json();

    return dataset;
  }

  async getEventsGroupedByDate(projectId: string, timeframe: Timeframe) {
    const resultSet = await this.clickhouse.query({
      query: `SELECT
          toDate(date) AS date,
          name,
          CAST(COUNT(*) AS Int32) AS count
      FROM events
      WHERE date >= now() - INTERVAL ${timeframe} DAY
      AND projectUuid = '${projectId}'
      AND name <> 'Page View'
      GROUP BY
          date,
          name
      ORDER BY
          name ASC,
          date ASC`,
      format: 'JSONEachRow',
    });

    const dataset: Array<{
      name: string;
      date: string;
      count: number;
    }> = await resultSet.json();

    return dataset;
  }

  async getSessions(projectId: string, timeframe: Timeframe) {
    const resultSet = await this.clickhouse.query({
      query: `
      SELECT
        sessionUuid,
        COUNTDistinct(url) AS pagesPerSession,
        toDate(date) AS date,
      FROM events
      WHERE date >= now() - INTERVAL ${timeframe} DAY
      AND projectUuid = '${projectId}'
      GROUP BY
          sessionUuid,
          date;`,
      format: 'JSONEachRow',
    });

    const dataset: Array<{
      sessionUuid: string;
      date: string;
      pagesPerSession: number;
    }> = await resultSet.json();

    return dataset;
  }

  async getBounceRate(
    projectId: string,
    timeframe: Timeframe,
    showPrevious?: boolean,
  ) {
    const whereClause = showPrevious
      ? `WHERE date >= now() - INTERVAL ${timeframe * 2} DAY
      AND date <= now() - INTERVAL ${timeframe} DAY`
      : `WHERE date >= now() - INTERVAL ${timeframe} DAY`;

    const resultSet = await this.clickhouse.query({
      query: `WITH
      sessions AS
      (
          SELECT
              sessionUuid,
              COUNTDistinct(url) AS pages_per_session,
              toDate(date) AS session_date
          FROM events
          ${whereClause}
          AND projectUuid = '${projectId}'
          GROUP BY
              sessionUuid,
              session_date
      ),
      bounces AS
      (
          SELECT COUNT(*) AS bounce_count
          FROM sessions
          WHERE pages_per_session = 1
      ),
      total_sessions AS
      (
          SELECT COUNTDistinct(sessionUuid) AS total_sessions_count
          FROM sessions
      )
      SELECT (bounces.bounce_count / total_sessions.total_sessions_count) * 100 AS bounceRate
      FROM bounces, total_sessions`,
      format: 'JSONEachRow',
    });

    const dataset: Array<{
      bounceRate: number;
    }> = await resultSet.json();

    if (dataset.length === 1) {
      return dataset[0].bounceRate;
    }

    return 0;
  }

  async deleteForProject(projectId: string) {
    return await this.clickhouse.exec({
      query: `DELETE FROM events WHERE projectUuid = '${projectId}'`,
    });
  }

  async getClusterPoints(
    projectId: string,
    timeframe: Timeframe,
    viewportWidth: string,
  ) {
    const cellCount = 40;
    const resultSet = await this.clickhouse.query({
      query: `SELECT
      floor(posX / (viewportWidth / ${cellCount})) as grid_x_percent, 
      floor(posY / (viewportWidth / ${cellCount})) as grid_y_percent, 
      CAST(COUNT(*) AS Int32) AS click_count
    FROM events
    WHERE date >= now() - INTERVAL ${timeframe} DAY
    AND projectUuid = '${projectId}'
    AND posX IS NOT NULL
    AND posY IS NOT NULL
    AND viewportWidth = ${viewportWidth}
    GROUP BY grid_x_percent, grid_y_percent, viewportWidth
    ORDER BY click_count DESC;`,
      format: 'JSONEachRow',
    });

    const dataset = await resultSet.json();

    return dataset;
  }

  async getDistinctViewport(
    projectId: string,
    timeframe: Timeframe,
    url: string,
  ) {
    const resultSet = await this.clickhouse.query({
      query: `SELECT DISTINCT viewportWidth
      FROM events
      WHERE date >= now() - INTERVAL ${timeframe} DAY
      AND projectUuid = '${projectId}'
      AND posX IS NOT NULL
      AND posY IS NOT NULL
      AND url = '${url}'
      ORDER BY viewportWidth;`,
      format: 'JSONEachRow',
    });

    const dataset = await resultSet.json();

    return dataset;
  }
}
