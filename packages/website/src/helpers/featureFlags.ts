import { getProgressivelyData } from "@progressively/server-side";

export const getFlags = async () => {
  const progressivelyEnv = import.meta.env.PROGRESSIVELY_ENV;

  const { data } = await getProgressivelyData(progressivelyEnv, {
    apiUrl: "https://api.progressively.app",
    websocketUrl: "wss://api.progressively.app",
    shouldHit: true,
  });

  return data.initialFlags || {};
};
