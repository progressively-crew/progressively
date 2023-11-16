const sleepDelay = Number(process.env.SLEEP_DELAY || 2000);

export const sleep = () =>
  new Promise((resolve) => setTimeout(resolve, sleepDelay));
