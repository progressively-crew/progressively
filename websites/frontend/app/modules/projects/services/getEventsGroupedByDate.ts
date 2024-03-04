import { Constants } from "~/constants";

export const getEventsGroupedByDate = async (
  projectId: string,
  timeframe: number,
  accessToken: string
): Promise<Array<{ name: string; date: string; count: number }>> => {
  const url = new URL(
    `${Constants.BackendUrl}/projects/${projectId}/events/count`
  );

  url.searchParams.set("timeframe", String(timeframe));

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};
