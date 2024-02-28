import { getClient } from "../clickhouse-client";

const createDbQuery = `CREATE DATABASE IF NOT EXISTS default;`;

const tableEventQuery = `
CREATE TABLE events
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
PRIMARY KEY (date, projectUuid)
`;

export const seedEvents = async () => {
  const client = getClient();
  await client.query({
    query: createDbQuery,
    format: "JSONEachRow",
  });
  await client.query({
    query: tableEventQuery,
    format: "JSONEachRow",
  });

  client.close();
  console.log("[Clickhouse] Db created");
};

export const cleanupEvents = async () => {
  const client = getClient();
  await client.query({
    query: "DROP DATABASE IF EXISTS default",
    format: "JSONEachRow",
  });
  client.close();
  console.log("[Clickhouse] Db dropped");
};
