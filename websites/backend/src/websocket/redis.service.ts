import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private publisher: Redis;
  private subscriber: Redis;

  constructor() {
    const redisUrl = process.env.REDIS_URL;

    this.publisher = new Redis(redisUrl);
    this.subscriber = new Redis(redisUrl);
  }
  async onModuleDestroy() {
    await this.close();
  }

  async close() {
    const teardown = async (redis: Redis) => {
      await new Promise((resolve) => {
        redis.quit();
        redis.on('end', resolve);
      });
    };

    await Promise.all([teardown(this.publisher), teardown(this.subscriber)]);
  }

  notifyChannel(channel: string, message: unknown) {
    this.publisher.publish(channel, JSON.stringify(message));
  }

  subscribe(channel: string, callback: (data: unknown) => void) {
    this.subscriber.subscribe(channel);

    this.subscriber.on('message', (channelName: string, message: string) => {
      if (channelName === channel) {
        callback(JSON.parse(message));
      }
    });
  }
}
