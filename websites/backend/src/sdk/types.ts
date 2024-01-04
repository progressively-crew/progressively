import { DeviceInfo } from '../shared/utils/getDeviceInfo';

export interface EventHit {
  name: string;
  data?: any;
  url?: string;
  referer?: string;
}

export interface QueuedEventHit extends EventHit, DeviceInfo {
  clientKey?: string; // queued event is processed "later" and so, one of the keys is required
  secretKey?: string;
  domain?: string;
  visitorId: string;
}
