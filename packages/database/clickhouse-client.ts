import { createClient } from "@clickhouse/client";

export const getClient = () => {
  const client = createClient({
    host: process.env.CLICKHOUSE_HOST!,
    username: process.env.CLICKHOUSE_USER!,
    password: process.env.CLICKHOUSE_PASSWORD!,
  });

  return client;
};
