import { Constants } from "~/constants";

export const getFlagHits = async (
  flagId: string,
  timeframe: number,
  accessToken: string
) => {
  const url = new URL(`${Constants.BackendUrl}/flags/${flagId}/hits`);

  url.searchParams.set("timeframe", String(timeframe));

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};
