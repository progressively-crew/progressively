import { Constants } from "~/constants";

export const getPageViewEvent = async (
  projectId: string,
  startDate: Date,
  endDate: Date,
  accessToken: string
) => {
  const url = new URL(
    `${Constants.BackendUrl}/projects/${projectId}/events/pageview/urls`
  );

  url.searchParams.set("startDate", startDate.toISOString());
  url.searchParams.set("endDate", endDate.toISOString());

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};