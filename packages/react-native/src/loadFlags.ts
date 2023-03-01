export function loadFlags(
  apiUrl: string,
  sdkParams: string,
  ctrl?: AbortController
) {
  let response: Response;

  return fetch(`${apiUrl}/sdk/${sdkParams}}`, {
    credentials: "include",
    signal: ctrl?.signal,
  })
    .then((res) => {
      response = res;

      if (!res.ok) {
        throw new Error("Request couldn't succeed");
      }

      return response.json();
    })
    .then((flags) => {
      const userId = response?.headers?.get("X-progressively-id");

      return { flags, response, userId };
    })
    .catch((error) => {
      return { flags: {}, response, error, userId: undefined };
    });
}
