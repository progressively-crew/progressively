import { Constants } from "~/constants";

export const getDistinctViewport = async (
  projectId: string,
  websiteUrl: string,
  timeframe: number,
  accessToken: string
) => {
  const url = new URL(
    `${Constants.BackendUrl}/projects/${projectId}/events/viewports`
  );

  url.searchParams.set("timeframe", String(timeframe));
  url.searchParams.set("url", websiteUrl);

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};
