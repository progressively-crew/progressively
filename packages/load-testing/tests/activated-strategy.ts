import { createCounter, expect } from "./helpers/assertions";
import { changeFlagStatus } from "./helpers/changeFlagStatus";
import { test } from "./helpers/runner";

test("[Boolean activation]: everybody receives the same variations at load and update time", async (browsers) => {
  await browsers.open("http://localhost:3000");

  await browsers.run(async (page, index) => {
    await expect(page).toHaveText(`User ${index}`);
    await expect(page).toHaveText(`New variant`);
  });

  await changeFlagStatus("1", "1", "NOT_ACTIVATED");

  await browsers.run(async (page, index) => {
    await expect(page).toHaveText(`User ${index}`);
    await expect(page).toHaveText(`Old variant`);
  });
});

test("[Percentage activation authenticated]: 25% of the people should receive the activated variant when activating it", async (browsers, config) => {
  await browsers.open("http://localhost:3000");

  await browsers.run(async (page, index) => {
    await expect(page).toHaveText(`User ${index}`);
    await expect(page).toHaveText(`Old footer variant`);
  });

  await changeFlagStatus("1", "2", "ACTIVATED");

  // Checking numbers
  const activatedCounter = createCounter(
    "New footer variant",
    config.userCount
  );

  const notActivatedCounter = createCounter(
    "Old footer variant",
    config.userCount
  );

  await browsers.run(async (page) => {
    await activatedCounter.increaseWhenVisible(page);
    await notActivatedCounter.increaseWhenVisible(page);
  });

  await activatedCounter.verifyRange(15, 25);
  await notActivatedCounter.verifyRange(75, 85);
});

test("[Percentage activation anonymous]: 25% of the people should receive the activated variant when activating it", async (browsers, config) => {
  const isAnonymous = true;
  await browsers.open("http://localhost:3000", isAnonymous);

  await browsers.run(async (page, index) => {
    await expect(page).toHaveText(`User ${index}`);
    await expect(page).toHaveText(`Old footer variant`);
  });

  await changeFlagStatus("1", "2", "ACTIVATED");

  // Checking numbers
  const activatedCounter = createCounter(
    "New footer variant",
    config.userCount
  );

  const notActivatedCounter = createCounter(
    "Old footer variant",
    config.userCount
  );

  await browsers.run(async (page) => {
    await activatedCounter.increaseWhenVisible(page);
    await notActivatedCounter.increaseWhenVisible(page);
  });

  await activatedCounter.verifyRange(15, 25);
  await notActivatedCounter.verifyRange(75, 85);
});
