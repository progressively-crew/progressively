import { Constants } from "~/constants";

export const getGlobalMetric = async (
  projectId: string,
  timeframe: number,
  accessToken: string
): Promise<{
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
}> => {
  const url = new URL(
    `${Constants.BackendUrl}/projects/${projectId}/metrics/global`
  );

  url.searchParams.set("timeframe", String(timeframe));

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};
