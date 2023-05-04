import { getProgressivelyData } from "@progressively/server-side";

export const getFlags = async () => {
  const progressivelyEnv = import.meta.env.PROGRESSIVELY_ENV;

  const { data } = await getProgressivelyData(progressivelyEnv, {
    apiUrl: "https://backend-progressively.fly.dev",
    websocketUrl: "wss://backend-progressively.fly.dev",
  });

  return data.initialFlags || {};
};
