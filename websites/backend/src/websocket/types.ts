import { FieldRecord } from '../rule/types';
import { WebSocket as WS } from 'ws';

export interface LocalWebsocket extends WS {
  __ROOMS: Array<string>;
  __FIELDS: FieldRecord;
  isAlive: boolean;
}

export type Subscriber<T> = (
  args: T,
  fields: FieldRecord,
) => Promise<unknown | undefined>;
