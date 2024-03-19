export const getClusterPoints = (projectId: string, timeframe: number) => {
  const url = new URL(
    `http://localhost:4000/projects/${projectId}/events/clusters`
  );

  url.searchParams.set("timeframe", String(timeframe));

  return fetch(url, {}).then((res) => res.json());
};
