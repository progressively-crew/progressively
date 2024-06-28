export const getEventsPerSelector = (
  projectId: string,
  actualUrl: string,
  timeframe: number,
  accessToken: string
) => {
  const url = new URL(
    `${
      (window as any).__progressivelyEndpoint
    }/projects/${projectId}/events/selectors`
  );

  url.searchParams.set("timeframe", String(timeframe));
  url.searchParams.set("url", actualUrl);

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Not authorized to fetch the endpoint.");
    }

    return res.json();
  });
};
