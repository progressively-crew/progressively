/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test";
import { changeFlagStatus } from "../helpers/changeFlagStatus";
import { cleanupDb, seedDb } from "../helpers/seed";

const userCount = process.env.USER_COUNT ? Number(process.env.USER_COUNT) : 10;

test.describe.configure({ mode: "serial" });

test.beforeEach(async () => {
  await seedDb(userCount);
});

test.afterEach(async () => {
  await cleanupDb();
});

test("everybody receives the same variations at load and update time", async ({
  page,
}) => {
  for (let i = 0; i < userCount; i++) {
    await page.goto("http://localhost:3000/?id=" + i);
    await expect(page.getByText("New variant")).toBeVisible();
  }

  await changeFlagStatus("1", "1", "NOT_ACTIVATED");

  for (let i = 0; i < userCount; i++) {
    await page.goto("http://localhost:3000?id=" + i);
    await expect(page.getByText("Old variant")).toBeVisible();
  }
});

test("footer resolution should approximate 25% (load time)", async ({
  page,
}) => {
  // 10 users give us 20%
  // 100 users give us 15%
  // 1000 users give us 25%
  await changeFlagStatus("1", "2", "ACTIVATED");

  let activated = 0;
  let notActivated = 0;

  for (let i = 0; i < userCount; i++) {
    await page.goto("http://localhost:3000?id=" + i);

    await page.waitForSelector("text=Loading...", { state: "detached" });

    if (await page.isVisible("text=New footer variant")) {
      activated++;
    } else if (await page.isVisible("text=Old footer variant")) {
      notActivated++;
    } else {
      console.log("Something weird just happened");
    }
  }

  expect(activated).toBe(2);
  expect(notActivated).toBe(8);
});

// 10 users give us 20%
// 100 users give us 15%
// 1000 users give us 25%
test("footer resolution should approximate 25% (websockets time)", async ({
  page,
}) => {
  let activated = 0;
  let notActivated = 0;

  for (let i = 0; i < userCount; i++) {
    await changeFlagStatus("1", "2", "NOT_ACTIVATED");
    await page.goto("http://localhost:3000?id=" + i);
    // Trigger websockets update
    await page.waitForSelector("text=Loading...", { state: "detached" });
    await changeFlagStatus("1", "2", "ACTIVATED");

    await new Promise((resolve) => setTimeout(resolve, 200));

    if (await page.isVisible("text=New footer variant")) {
      activated++;
    } else if (await page.isVisible("text=Old footer variant")) {
      notActivated++;
    } else {
      console.log("Something weird just happened");
    }
  }

  expect(activated).toBe(2);
  expect(notActivated).toBe(8);
});
