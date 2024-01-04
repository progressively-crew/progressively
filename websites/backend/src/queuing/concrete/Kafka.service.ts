import { Consumer, Kafka, Producer, logLevel } from 'kafkajs';
import { getEnv } from '../getEnv';
import { IQueuingService } from '../types';

export class KafkaService implements IQueuingService {
  private kafka: Kafka | undefined;
  private producer: Producer;
  private consumer: Consumer;

  constructor() {
    const env = getEnv();

    this.kafka = new Kafka({
      clientId: 'progressively',
      brokers: [env.KafkaBroker],
      ssl: true,
      sasl: {
        mechanism: 'scram-sha-256',
        username: env.KafkaUser,
        password: env.KafkaPassword,
      },
      logLevel: logLevel.ERROR,
    });
  }

  async send(topic: string, message: any) {
    if (!this.producer) {
      this.producer = this.kafka.producer();
      await this.producer.connect();
    }

    await this.producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  async consume<T>(topicName: string, callback: (parsedMsg: T) => void) {
    if (!this.consumer) {
      this.consumer = this.kafka.consumer({
        groupId: 'progressively-analytics-group',
      });
      await this.consumer.connect();
      await this.consumer.subscribe({ topics: [topicName] });
    }

    return this.consumer.run({
      eachMessage: async ({ message }) => {
        const obj = JSON.parse(message.value.toString()) as T;
        callback(obj);
      },
    });
  }

  async teardown() {
    if (this.consumer) {
      await this.consumer.disconnect();
    }

    if (this.producer) {
      await this.producer.disconnect();
    }
  }
}
