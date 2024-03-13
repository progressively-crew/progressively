import { Flag } from "@prisma/client";
import { getClient } from "../clickhouse-client";

const createFlagHit = (
  date: Date,
  flagUuid: string,
  valueResolved: string,
  visitorId: string
) => {
  return {
    date,
    visitorId,
    valueResolved,
    flagUuid,
  };
};

export const seedFlagHitsVariants = async (flag: Flag, count = 1) => {
  const client = getClient();
  const values = [];
  for (let i = 1; i <= count; i++) {
    const date = new Date();

    const count = i / 2;

    for (let y = 0; y < count; y++) {
      const flagHit = createFlagHit(date, flag.uuid, "Control", "1");
      values.push(flagHit);

      if (y < count / 2) {
        const flagHit2 = createFlagHit(date, flag.uuid, "Second", "1");
        values.push(flagHit2);
      }
    }
  }

  await client.insert({
    table: "flaghits",
    values,
    format: "JSONEachRow",
    clickhouse_settings: {
      // Allows to insert serialized JS Dates (such as '2023-12-06T10:54:48.000Z')
      date_time_input_format: "best_effort",
    },
  });

  return client.close();
};

export const seedFlagHits = async (flag: Flag, date: Date, count = 10) => {
  const client = getClient();

  const values = [];
  for (let i = 0; i < count; i++) {
    const flagHit = createFlagHit(date, flag.uuid, "true", "1");
    values.push(flagHit);

    if (i < count / 2) {
      const flagHit2 = createFlagHit(date, flag.uuid, "false", "1");
      values.push(flagHit2);
    }
  }

  await client.insert({
    table: "flaghits",
    values,
    format: "JSONEachRow",
    clickhouse_settings: {
      // Allows to insert serialized JS Dates (such as '2023-12-06T10:54:48.000Z')
      date_time_input_format: "best_effort",
    },
  });

  return client.close();
};
