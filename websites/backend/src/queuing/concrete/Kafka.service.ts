import { Consumer, Kafka, Producer, logLevel } from 'kafkajs';
import { getEnv } from '../getEnv';
import { IQueuingService } from '../types';

export class KafkaService implements IQueuingService {
  private producer: Producer;
  private consumer: Consumer;

  constructor(producer: Producer, consumer: Consumer) {
    this.producer = producer;
    this.consumer = consumer;
  }

  static async create() {
    const env = getEnv();

    const kafka = new Kafka({
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

    const producer = kafka.producer();
    await producer.connect();

    const consumer = kafka.consumer({
      groupId: 'progressively-analytics-group',
    });

    await consumer.connect();

    return new KafkaService(producer, consumer);
  }

  async send(topic: string, message: any) {
    await this.producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  async consume<T>(topicName: string, callback: (parsedMsg: T) => void) {
    await this.consumer.subscribe({ topics: [topicName] });

    return this.consumer.run({
      eachMessage: async ({ message, topic }) => {
        if (topic === topicName) {
          const obj = JSON.parse(message.value.toString()) as T;
          callback(obj);
        }
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
