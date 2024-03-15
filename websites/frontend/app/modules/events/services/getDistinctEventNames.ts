import { Constants } from "~/constants";

export const getDistinctEventNames = async (
  projectId: string,
  timeframe: number,
  accessToken: string
) => {
  const url = new URL(`${Constants.BackendUrl}/projects/${projectId}/events`);

  url.searchParams.set("timeframe", String(timeframe));

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};
