import { Inject, Injectable } from '@nestjs/common';
import { ClickHouseClient, Tables } from '@progressively/database';
import { QueuedEventHit } from '../sdk/types';

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
}
