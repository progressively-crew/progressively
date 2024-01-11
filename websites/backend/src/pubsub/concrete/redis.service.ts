import { Redis } from 'ioredis';
import { IPubsubService } from '../types';

export class RedisService implements IPubsubService {
  private publisher: Redis;
  private subscriber: Redis;

  constructor() {
    const redisUrl = process.env.REDIS_URL;

    this.publisher = new Redis(redisUrl);
    this.subscriber = new Redis(redisUrl);
  }

  subscribe<T>(channel: string, callback: (parsedMsg: T) => void) {
    this.subscriber.subscribe(channel);

    this.subscriber.on('message', (channelName: string, message: string) => {
      if (channelName === channel) {
        callback(JSON.parse(message));
      }
    });
  }

  async teardown() {
    const teardown = async (redis: Redis) => {
      await new Promise((resolve) => {
        redis.quit();
        redis.on('end', resolve);
      });
    };

    await Promise.all([teardown(this.publisher), teardown(this.subscriber)]);
  }

  async notifyChannel(channel: string, message: unknown) {
    this.publisher.publish(channel, JSON.stringify(message));
  }
}
