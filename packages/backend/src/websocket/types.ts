import { FieldRecord } from '../strategy/types';
import { WebSocket as WS } from 'ws';

export interface LocalWebsocket extends WS {
  __ROLLOUT_ROOMS: Array<string>;
  __ROLLOUT_FIELDS: FieldRecord;
  isAlive: boolean;
}
