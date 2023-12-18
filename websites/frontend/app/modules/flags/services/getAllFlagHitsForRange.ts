import { Constants } from "~/constants";

export const getAllFlagHitsForRange = async (
  envId: string,
  flagId: string,
  startDate: Date,
  endDate: Date,
  accessToken: string
) => {
  const url = new URL(
    `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/all-hits`
  );

  url.searchParams.set("startDate", startDate.toISOString());
  url.searchParams.set("endDate", endDate.toISOString());

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};
