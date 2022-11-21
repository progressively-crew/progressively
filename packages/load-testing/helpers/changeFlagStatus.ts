import fetch from "node-fetch";

export const changeFlagStatus = (
  envId: string,
  flagId: string,
  status: string
) =>
  fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: `marvin.frachet@something.com`,
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
          "Content-Type": "application/json",
        },
      })
    );
