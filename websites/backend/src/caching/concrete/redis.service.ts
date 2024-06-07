import { Redis } from 'ioredis';
import { ICachingService } from '../types';

export class RedisService implements ICachingService {
  private redis: Redis;

  constructor() {
    const redisUrl = process.env.REDIS_CACHING_URL;
    this.redis = new Redis(redisUrl);
  }

  async set(k: string, v: any, timeInS?: number) {
    if (timeInS) {
      await this.redis.set(k, v, 'EX', timeInS);
    } else {
      this.redis.set(k, v);
    }
  }

  get(k: string) {
    return this.redis.get(k);
  }
}
