import { Consumer, Kafka, Producer, logLevel } from 'kafkajs';
import { getEnv } from '../getEnv';
import { IQueuingService } from '../types';

export class KafkaService implements IQueuingService {
  private kafka: Kafka;
  private producer: Producer;
  private consumers: Array<Consumer>;

  constructor(producer: Producer, kafka: Kafka) {
    this.producer = producer;
    this.kafka = kafka;
    this.consumers = [];
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

    return new KafkaService(producer, kafka);
  }

  async send(topic: string, message: any) {
    await this.producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  async consume<T>(
    topicName: string,
    groupId: string,
    callback: (parsedMsg: T) => void,
  ) {
    const consumer = this.kafka.consumer({
      groupId,
    });

    await consumer.connect();
    await consumer.subscribe({ topics: [topicName] });

    this.consumers.push(consumer);

    return consumer.run({
      eachMessage: async ({ message, topic }) => {
        if (topic === topicName) {
          const obj = JSON.parse(message.value.toString()) as T;
          callback(obj);
        }
      },
    });
  }

  async teardown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }

    if (this.producer) {
      await this.producer.disconnect();
    }
  }
}
