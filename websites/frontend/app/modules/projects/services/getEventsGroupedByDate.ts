import { Constants } from "~/constants";

export const getEventsGroupedByDate = async (
  projectId: string,
  timeframe: number,
  name: string,
  accessToken: string
): Promise<Array<{ date: string; count: number }>> => {
  const url = new URL(
    `${Constants.BackendUrl}/projects/${projectId}/events/date`
  );

  url.searchParams.set("timeframe", String(timeframe));
  url.searchParams.set("name", name);

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};
