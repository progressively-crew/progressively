import { getProgressivelyData } from "@progressively/server-side";

export const getFlags = async () => {
  const progressivelyEnv = import.meta.env.PROGRESSIVELY_ENV;

  const { data } = await getProgressivelyData(progressivelyEnv, {
    shouldHit: true,
  });

  return data.initialFlags || {};
};
