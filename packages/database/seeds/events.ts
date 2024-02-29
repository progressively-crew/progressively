import { getClient } from "../clickhouse-client";

export const seedEvents = async () => {
  const client = getClient();

  return client.close();
};
