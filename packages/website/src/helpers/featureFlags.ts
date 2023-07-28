import { Progressively } from "@progressively/server-side";

export const getFlags = async () => {
  const progressivelyEnv = import.meta.env.PROGRESSIVELY_ENV;

  const sdk = Progressively.init(progressivelyEnv, {
    shouldHit: true,
  });

  const { data } = await sdk.loadFlags();

  return data.flags || {};
};
