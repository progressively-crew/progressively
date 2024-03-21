export const getClusterPoints = (
  projectId: string,
  timeframe: number,
  viewportWidth: string,
  accessToken: string
) => {
  const url = new URL(
    `${
      (window as any).__progressivelyEndpoint
    }/projects/${projectId}/events/clusters`
  );

  url.searchParams.set("timeframe", String(timeframe));
  url.searchParams.set("viewportWidth", viewportWidth);

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};
