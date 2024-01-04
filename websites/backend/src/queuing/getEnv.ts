export const getEnv = () => ({
  KafkaBroker: process.env.KAFKA_BROKER,
  KafkaUser: process.env.KAFKA_USER,
  KafkaPassword: process.env.KAFKA_PASSWORD,
});
