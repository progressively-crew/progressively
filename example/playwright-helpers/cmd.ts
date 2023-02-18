import { cleanupDb, seedDb } from "@progressively/database/seed";

export const changeFlagStatus = (
  envId: string,
  flagId: string,
  status: string
) => {
  return fetch("http://localhost:4000/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: "marvin.frachet@something.com",
      password: "password",
    }),
  })
    .then((res) => res.json())
    .then(({ access_token }) =>
      fetch(`http://localhost:4000/environments/${envId}/flags/${flagId}`, {
        method: "PUT",
        body: JSON.stringify({
          status,
        }),
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    );
};

export const seed = seedDb;
export const cleanup = cleanupDb;
