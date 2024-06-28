import { Constants } from "~/constants";

export const getEventHotSpots = async (
  projectId: string,
  timeframe: number,
  accessToken: string
): Promise<Array<{ url: string; selectorCount: number }>> => {
  const url = new URL(
    `${Constants.BackendUrl}/projects/${projectId}/events/hot-spots`
  );

  url.searchParams.set("timeframe", String(timeframe));

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};
