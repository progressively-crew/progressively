import { getEnv } from './getEnv';

import { RedisService } from './concrete/redis.service';
import { InMemoryService } from './concrete/InMemory.service';
import { IPubsubService } from './types';

export const MakePubsubService = (): IPubsubService => {
  const env = getEnv();

  if (env.RedisUrl) {
    return new RedisService();
  }

  return new InMemoryService();
};
