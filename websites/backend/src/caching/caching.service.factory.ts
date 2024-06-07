import { ICachingService } from './types';
import { InMemoryService } from './concrete/InMemory.service';
import { RedisService } from './concrete/redis.service';
import { getEnv } from './getEnv';

export const MakeCachingService = (): ICachingService => {
  const env = getEnv();

  if (env.RedisCachingUrl) {
    return new RedisService();
  }

  return new InMemoryService();
};
