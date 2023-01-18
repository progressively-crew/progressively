import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private publisher: Redis;
  private subscriber: Redis;
  private alreadySubscribedChannels: { [key: string]: boolean };

  constructor() {
    const redisUrl = process.env.REDIS_URL;
    this.alreadySubscribedChannels = {};

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

  notifyChannel(channel: string, message: any) {
    this.publisher.publish(channel, JSON.stringify(message));
  }

  subscribe(channel: string, callback: (data: any) => void) {
    // Prevent multiple subscriptions to the same channel
    if (this.alreadySubscribedChannels[channel]) return;
    this.alreadySubscribedChannels[channel] = true;

    this.subscriber.subscribe(channel);

    this.subscriber.on('message', (channelName: string, message: string) => {
      if (channelName === channel) {
        callback(JSON.parse(message));
      }
    });
  }
}
