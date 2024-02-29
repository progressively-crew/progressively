import { Constants } from "~/constants";

export const getEventsForFields = async (
  projectId: string,
  timeframe: number,
  accessToken: string
): Promise<{
  browser: Array<{ field: string; pageViews: number }>;
  os: Array<{ field: string; pageViews: number }>;
  referrer: Array<{ field: string; pageViews: number }>;
  viewport: Array<{ field: string; pageViews: number }>;
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
