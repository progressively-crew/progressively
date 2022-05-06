import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { RedisClientType } from '@redis/client';
import { createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private publisher: RedisClientType;
  private subscriber: RedisClientType;
  private alreadySubscribedChannels: { [key: string]: boolean };

  constructor() {
    const redisUrl = process.env.REDIS_URL;
    this.alreadySubscribedChannels = {};

    this.publisher = createClient({ url: redisUrl });
    this.subscriber = this.publisher.duplicate();
  }

  async onModuleDestroy() {
    await this.publisher.disconnect();
    await this.subscriber.disconnect();
  }

  async onModuleInit() {
    await this.publisher.connect();
    await this.subscriber.connect();
  }

  notifyChannel(channel: string, message: any) {
    this.publisher.publish(channel, JSON.stringify(message));
  }

  subscribe(channel: string, callback: (data: any) => void) {
    // Prevent multiple subscriptions to the same channel
    if (this.alreadySubscribedChannels[channel]) return;
    this.alreadySubscribedChannels[channel] = true;

    this.subscriber.subscribe(channel, (message: string) =>
      callback(JSON.parse(message)),
    );
  }
}
