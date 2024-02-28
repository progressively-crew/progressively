import { Inject, Injectable } from '@nestjs/common';
import { ClickHouseClient, Tables } from '@progressively/database';
import { QueuedEventHit } from '../sdk/types';

@Injectable()
export class EventsService {
  constructor(
    @Inject('ClickHouseClient') private readonly clickhouse: ClickHouseClient,
  ) {}

  bulkAddEvents(
    events: Array<QueuedEventHit>,
    projectId: string,
    sessionUuid: string,
  ) {
    const eventsToStore = events.map((ev) => ({
      date: Date.now(),
      name: ev.name,
      visitorId: ev.visitorId,
      browser: ev.browser,
      os: ev.os,
      url: ev.url,
      referer: ev.referer,
      data: ev.data,
      projectUuid: projectId,
      sessionUuid,
      viewportHeight: ev.viewportHeight,
      viewportWidth: ev.viewportWidth,
    }));

    return this.clickhouse.insert({
      table: Tables.Events,
      // structure should match the desired format, JSONEachRow in this example
      values: eventsToStore,
      format: 'JSONEachRow',
    });
  }
}
