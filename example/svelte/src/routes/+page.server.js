import { getProgressivelyData } from "@progressively/server-side";

export async function load() {
  const { data } = await getProgressivelyData("valid-sdk-key", {
    websocketUrl: "ws://localhost:4000",
    apiUrl: "http://localhost:4000",
    fields: {
      email: "marvin.frachet@something.com",
      id: "1",
    },
  });

  return data;
}
