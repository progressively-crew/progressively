import { Constants } from "~/constants";

export const getPageViewsGroupedByDate = async (
  projectId: string,
  timeframe: number,
  name: string,
  accessToken: string
): Promise<Array<{ date: string; count: number }>> => {
  const url = new URL(
    `${Constants.BackendUrl}/projects/${projectId}/events/page-views`
  );

  url.searchParams.set("timeframe", String(timeframe));
  url.searchParams.set("name", name);

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};
