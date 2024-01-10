import { IQueuingService } from '../types';

let topics: Record<string, Array<(parsedMsg: any) => void>> = {};

export class InMemoryService implements IQueuingService {
  async send(topic: string, message: any) {
    if (topics[topic]) {
      topics[topic].forEach((cb) => cb(message));
    }
  }

  async consume<T>(
    topic: string,
    groupId: string,
    callback: (parsedMsg: T) => void,
  ) {
    if (!topics[topic]) {
      topics[topic] = [];
    }

    topics[topic].push(callback);
  }

  async teardown() {
    topics = undefined;
  }
}
