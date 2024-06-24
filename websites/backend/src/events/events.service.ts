import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClickHouseClient, Tables } from '@progressively/database';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FunnelEntry } from '@progressively/database';
import { QueuedEventHit } from '../sdk/types';
import { Timeframe } from './types';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ICachingService } from '../caching/types';
import {
  projectIdTimeframeEvent,
  projectIdTimeframeEventOverTime,
} from '../caching/keys';

@Injectable()
export class EventsService {
  constructor(
    @Inject('ClickhouseService') private readonly clickhouse: ClickHouseClient,
    @Inject('CachingService') private readonly cachingService: ICachingService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleOutdatedEventsRemovalCron() {
    this.logger.log({
      level: 'info',
      context: 'cron',
      message: 'Cleaning outdated events',
    });

    return this.deleteOutdatedEvents();
  }

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

  async getFunnelEntryVisitorIds(
    funnelEntry: FunnelEntry,
    projectId: string,
    visitorIds: Array<{ visitorId: string }>,
    timeframe: Timeframe,
  ) {
    const table = funnelEntry.flagUuid ? 'flaghits' : 'events';
    let whereClause =
      table === 'flaghits'
        ? `AND flagUuid = '${funnelEntry.flagUuid}' AND valueResolved = '${funnelEntry.flagVariant}'`
        : `AND projectUuid = '${projectId}' AND name = '${funnelEntry.eventName}'`;

    if (table === 'events' && funnelEntry.eventName === 'Page View') {
      whereClause += ` AND url = '${funnelEntry.eventValue}'`;
    }

    const sqlFormattedIds = visitorIds
      .map((v) => `'${v.visitorId}'`)
      .join(', ');

    const visitorClause =
      visitorIds.length > 0 ? `AND visitorId IN (${sqlFormattedIds});` : ``;

    const resultSet = await this.clickhouse.query({
      query: `SELECT DISTINCT visitorId
      FROM ${table}
      WHERE date >= now() - INTERVAL ${timeframe} DAY
      ${whereClause}
      ${visitorClause}`,
      format: 'JSONEachRow',
    });

    const dataset: Array<{ visitorId: string }> = await resultSet.json();

    return dataset;
  }

  async getPageViews(
    projectId: string,
    timeframe: Timeframe,
    showPrevious?: boolean,
  ) {
    const cachingKey = projectIdTimeframeEvent(
      projectId,
      timeframe,
      'page-views',
      showPrevious,
    );

    const cachedData = await this.cachingService.get<number>(cachingKey);
    if (cachedData) return cachedData;

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

    const pageViewsCount =
      dataset.length === 1 ? Number(dataset[0].pageViews) : 0;

    await this.cachingService.set(cachingKey, pageViewsCount, 'HalfAnHour');

    return pageViewsCount;
  }

  async getUniqueVisitors(
    projectId: string,
    timeframe: Timeframe,
    showPrevious?: boolean,
  ) {
    const cachingKey = projectIdTimeframeEvent(
      projectId,
      timeframe,
      'unique-visitor',
      showPrevious,
    );

    const cachedData = await this.cachingService.get<number>(cachingKey);
    if (cachedData) return cachedData;

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

    const uniqueVisitors =
      dataset.length === 1 ? Number(dataset[0].uniqueVisitors) : 0;

    await this.cachingService.set(cachingKey, uniqueVisitors, 'HalfAnHour');

    return uniqueVisitors;
  }

  async getByField(
    projectId: string,
    timeframe: Timeframe,
    field: 'browser' | 'os' | 'referer' | 'url',
  ) {
    const cachingKey = projectIdTimeframeEvent(projectId, timeframe, field);

    const cachedData = await this.cachingService.get<{
      pageViews: string;
      [key: string]: string;
    }>(cachingKey);

    if (cachedData) return cachedData;

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

    await this.cachingService.set(cachingKey, dataset, 'HalfAnHour');

    return dataset;
  }

  async getByViewport(projectId: string, timeframe: Timeframe) {
    const cachingKey = projectIdTimeframeEvent(
      projectId,
      timeframe,
      'viewport',
    );

    const cachedData = await this.cachingService.get<{
      pageViews: string;
      viewportWidth: number;
      viewportHeight: number;
    }>(cachingKey);

    if (cachedData) return cachedData;

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

    await this.cachingService.set(cachingKey, dataset, 'HalfAnHour');

    return dataset;
  }

  async getPageViewsGroupedByDate(projectId: string, timeframe: Timeframe) {
    const cachingKey = projectIdTimeframeEventOverTime(
      projectId,
      timeframe,
      'page-views',
    );

    const cachedData = await this.cachingService.get<{
      date: string;
      count: number;
    }>(cachingKey);

    if (cachedData) return cachedData;

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

    await this.cachingService.set(cachingKey, dataset, 'HalfAnHour');

    return dataset;
  }

  async getEventsGroupedByDate(projectId: string, timeframe: Timeframe) {
    const cachingKey = projectIdTimeframeEventOverTime(
      projectId,
      timeframe,
      'custom-events',
    );

    const cachedData = await this.cachingService.get<{
      name: string;
      date: string;
      count: number;
    }>(cachingKey);

    if (cachedData) return cachedData;

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

    await this.cachingService.set(cachingKey, dataset, 'HalfAnHour');

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

  async getDistinctUrl(projectId: string, timeframe: Timeframe) {
    const resultSet = await this.clickhouse.query({
      query: `SELECT DISTINCT(url)
    FROM events
    WHERE toDate(date) >= now() - INTERVAL ${timeframe} DAY
    AND projectUuid = '${projectId}';`,
      format: 'JSONEachRow',
    });

    return await resultSet.json();
  }

  async getDistinctEvents(projectId: string, timeframe: Timeframe) {
    const resultSet = await this.clickhouse.query({
      query: `SELECT DISTINCT(name)
    FROM events
    WHERE toDate(date) >= now() - INTERVAL ${timeframe} DAY
    AND projectUuid = '${projectId}';`,
      format: 'JSONEachRow',
    });

    return await resultSet.json();
  }

  async deleteOutdatedEvents() {
    const timeframeToRemove: Timeframe = 90;

    return await this.clickhouse.exec({
      query: `DELETE FROM events WHERE date < now() - INTERVAL ${
        timeframeToRemove * 2
      } DAY;`,
    });
  }

  async getBounceRate(
    projectId: string,
    timeframe: Timeframe,
    showPrevious?: boolean,
  ) {
    const cachingKey = projectIdTimeframeEvent(
      projectId,
      timeframe,
      'bounce-rate',
      showPrevious,
    );

    const cachedData = await this.cachingService.get<number>(cachingKey);
    if (cachedData) return cachedData;

    const whereClause = showPrevious
      ? `WHERE session_date >= now() - INTERVAL ${timeframe * 2} DAY
      AND date <= now() - INTERVAL ${timeframe} DAY`
      : `WHERE session_date >= now() - INTERVAL ${timeframe} DAY`;

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

    const bounceRate = dataset.length === 1 ? dataset[0].bounceRate || 0 : 0;

    await this.cachingService.set(cachingKey, bounceRate, 'HalfAnHour');

    return bounceRate;
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
    WHERE toDate(date) >= now() - INTERVAL ${timeframe} DAY
    AND projectUuid = '${projectId}'
    AND posX IS NOT NULL
    AND posY IS NOT NULL
    AND viewportWidth = ${viewportWidth}
    GROUP BY grid_x_percent, grid_y_percent, viewportWidth
    ORDER BY click_count DESC;`,
      format: 'JSONEachRow',
    });

    return await resultSet.json();
  }

  async getDistinctViewport(
    projectId: string,
    timeframe: Timeframe,
    url: string,
  ) {
    const resultSet = await this.clickhouse.query({
      query: `SELECT DISTINCT viewportWidth
      FROM events
      WHERE toDate(date) >= now() - INTERVAL ${timeframe} DAY
      AND projectUuid = '${projectId}'
      AND posX IS NOT NULL
      AND posY IS NOT NULL
      AND url = '${url}'
      ORDER BY viewportWidth;`,
      format: 'JSONEachRow',
    });

    return await resultSet.json();
  }
}
