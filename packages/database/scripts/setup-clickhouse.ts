import { getClient } from "../clickhouse-client";

// export const createDbQuery = `CREATE DATABASE IF NOT EXISTS default;`;

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
    posX Nullable(UInt32),
    posY Nullable(UInt32),
    projectUuid Nullable(String),
    sessionUuid Nullable(String),
    viewportHeight Nullable(Int32),
    viewportWidth Nullable(Int32)
)
ENGINE = MergeTree()
PRIMARY KEY date
`;

const tableFlagHitQuery = `
CREATE TABLE flaghits
(
    date DateTime,
    visitorId String,
    valueResolved String,
    flagUuid String
)
ENGINE = MergeTree()
PRIMARY KEY date
`;

export const setupClickhouse = async () => {
  const client = getClient();

  await Promise.all([
    client.query({
      query: tableEventQuery,
      format: "JSONEachRow",
    }),
    client.query({
      query: tableFlagHitQuery,
      format: "JSONEachRow",
    }),
  ]);

  console.log("[Clickhouse] Db seed");
  return client.close();
};

export const cleanupEvents = async () => {
  const client = getClient();

  await Promise.all([
    client.exec({
      query: "DELETE FROM events WHERE 1=1;",
    }),
    client.exec({
      query: "DELETE FROM flaghits WHERE 1=1;",
    }),
  ]);

  console.log("[Clickhouse] Tables are empty");

  return client.close();
};
