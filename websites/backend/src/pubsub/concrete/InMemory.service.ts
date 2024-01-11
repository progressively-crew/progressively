import { IPubsubService } from '../types';

let channels: Record<string, Array<(parsedMsg: any) => void>> = {};

export class InMemoryService implements IPubsubService {
  constructor() {}

  async teardown() {
    channels = undefined;
  }

  async notifyChannel(channel: string, message: any) {
    if (channels[channel]) {
      channels[channel].forEach((cb) => cb(message));
    }
  }
  subscribe<T>(channel: string, callback: (parsedMsg: T) => void) {
    if (!channels[channel]) {
      channels[channel] = [];
    }

    channels[channel].push(callback);
  }
}
