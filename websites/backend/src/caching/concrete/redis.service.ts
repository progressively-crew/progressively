import { Redis } from 'ioredis';
import { ICachingService } from '../types';
import { Time, TimeType } from '../constants';

export class RedisService implements ICachingService {
  private redis: Redis;

  constructor() {
    const redisUrl = process.env.REDIS_CACHING_URL;
    this.redis = new Redis(redisUrl);
  }

  async teardown() {
    await this.redis.quit();
  }

  async set(k: string, v: any, timeInS?: TimeType) {
    if (timeInS) {
      const time = Time[timeInS];
      if (typeof v === 'string') {
        await this.redis.set(k, v, 'EX', time);
      } else {
        await this.redis.set(k, JSON.stringify(v), 'EX', time);
      }
    } else {
      this.redis.set(k, v);
    }
  }

  async get<T>(k: string) {
    const data = await this.redis.get(k);

    try {
      return JSON.parse(data) as T;
    } catch {
      try {
        return Number(data) as T;
      } catch {
        return data as T;
      }
    }
  }
}
