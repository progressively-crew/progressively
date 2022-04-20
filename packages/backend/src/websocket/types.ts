import { FieldRecord } from '../strategy/types';
import { WebSocket as WS } from 'ws';

export interface LocalWebsocket extends WS {
  __ROOMS: Array<string>;
  __FIELDS: FieldRecord;
  isAlive: boolean;
}
