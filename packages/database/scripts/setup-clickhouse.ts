import { getClient } from "../clickhouse-client";

// export const createDbQuery = `CREATE DATABASE IF NOT EXISTS default;`;

export const tableEventQuery = `
CREATE TABLE IF NOT EXISTS events
(
    date DateTime,
    name String,
    visitorId String,
    browser String,
    os String,
    url String,
    referer Nullable(String),
    data Nullable(String),
    projectUuid Nullable(String),
    sessionUuid Nullable(String),
    viewportHeight Nullable(Int32),
    viewportWidth Nullable(Int32)
)
ENGINE = MergeTree()
PRIMARY KEY date
`;

export const setupClickhouse = async () => {
  const client = getClient();

  await client.query({
    query: tableEventQuery,
    format: "JSONEachRow",
  });

  console.log("[Clickhouse] Db seed");
  return client.close();
};

export const cleanupEvents = async () => {
  const client = getClient();

  await client.exec({
    query: "DELETE FROM events WHERE 1=1;",
  });

  console.log("[Clickhouse] Db dropped");

  return client.close();
};
