import { DeviceInfo } from '../shared/utils/getDeviceInfo';

export interface EventHit {
  name: string;
  data?: any;
  url?: string;
  referer?: string;
  viewportWidth?: number;
  viewportHeight?: number;
  posX?: number;
  posY?: number;
}

export interface QueuedEventHit extends EventHit, DeviceInfo {
  clientKey?: string; // queued event is processed "later" and so, one of the keys is required
  secretKey?: string;
  domain?: string;
  visitorId: string;
  sessionUuid?: string; // is added later in the process
  projectUuid?: string; // is added later in the process
}
