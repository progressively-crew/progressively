import { getEnv } from './getEnv';
import { InMemoryService } from './concrete/InMemory.service';
import { IQueuingService } from './types';
import { KafkaService } from './concrete/Kafka.service';

export const MakeQueuingService = (): IQueuingService => {
  const env = getEnv();

  if (env.KafkaBroker && env.KafkaPassword && env.KafkaUser) {
    return new KafkaService();
  }

  return new InMemoryService();
};
