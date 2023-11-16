import { Constants } from "~/constants";

export const getProject = (
  projectId: string,
  accessToken: string,
  populate?: boolean
) => {
  const url = new URL(`${Constants.BackendUrl}/projects/${projectId}`);

  if (populate) {
    url.searchParams.set("populate", "true");
  }

  return fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw res;
  });
};
