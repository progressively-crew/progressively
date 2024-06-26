import { getClient } from "../clickhouse-client";

const createEvent = (
  visitorId: string,
  date: Date,
  os: string = "Mac OS",
  browser: string = "Safari",
  url: string = "/somepage",
  name: string = "Page View",
  selector: string = "body > button"
) => {
  return {
    date,
    name,
    visitorId,
    os,
    browser,
    url,
    referer: "https://referer.com",
    data: null,
    projectUuid: "1",
    sessionUuid: visitorId,
    viewportHeight: 480,
    viewportWidth: 640,
    selector,
  };
};

export const seedEvents = async (eventCounts: number) => {
  const client = getClient();

  const values = [createEvent("2", new Date())];

  // Modify this value to see more real logs on N days
  const dayCount = eventCounts;
  for (let i = 1; i <= dayCount; i++) {
    const date = new Date();
    date.setDate(date.getDate() - dayCount + i);

    const count = i / 2;

    for (let y = 0; y < count; y++) {
      const event1 = createEvent("1", date);
      values.push(event1);

      if (y < count / 2) {
        const event2 = createEvent(
          "1",
          date,
          "Windows",
          "Chrome",
          "http://localhost:3000/hello",
          "Client CTA"
        );

        values.push(event2);
      }
    }
  }

  await client.insert({
    table: "events",
    values,
    format: "JSONEachRow",
    clickhouse_settings: {
      // Allows to insert serialized JS Dates (such as '2023-12-06T10:54:48.000Z')
      date_time_input_format: "best_effort",
    },
  });

  return client.close();
};
