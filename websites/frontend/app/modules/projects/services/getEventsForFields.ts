import { Constants } from "~/constants";

type Field = { [key: string]: string | number; pageViews: number };

export const getEventsForFields = async (
  projectId: string,
  timeframe: number,
  accessToken: string
): Promise<{
  browser: Array<Field>;
  os: Array<Field>;
  referrer: Array<Field>;
  viewport: Array<Field>;
  url: Array<Field>;
}> => {
  const url = new URL(
    `${Constants.BackendUrl}/projects/${projectId}/events/fields`
  );

  url.searchParams.set("timeframe", String(timeframe));

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};
