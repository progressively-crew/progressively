import { expect, getCookie, test } from "@progressively/playwright-helpers";
import {
  changeFlagStatus,
  cleanup,
  seed,
} from "@progressively/playwright-helpers/cmd";

test.describe("/", () => {
  test.beforeEach(async () => {
    await seed();
  });

  test.afterEach(async ({ page }) => {
    await cleanup();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows the old variant when the flag is not activated", async ({
    page,
  }) => {
    // The footer flag is activated by default in the seeding data
    // but only for users with 'id' 1 which is
    // marvin.frachet@something.com in the seeding data
    await expect(page.getByText("Old variant")).toBeVisible();
    await expect(page.getByText("Old footer")).toBeVisible();
  });

  test("shows the new variant when the flag is activated for homepage", async ({
    page,
  }) => {
    await changeFlagStatus("1", "ACTIVATED");

    // Verify the activation using sockets
    await expect(page.getByText("Old variant")).not.toBeVisible();
    await expect(page.getByText("New variant")).toBeVisible();

    // Verify the activation using SSR
    await page.reload();
    await expect(page.getByText("Old variant")).not.toBeVisible();
    await expect(page.getByText("New variant")).toBeVisible();
  });

  test("shows the old variant when the flag is activated for footer (by default activated)", async ({
    page,
  }) => {
    await changeFlagStatus("2", "NOT_ACTIVATED");

    // Verify the activation using sockets
    await expect(page.getByText("Old variant")).toBeVisible();
    await expect(page.getByText("New variant")).not.toBeVisible();

    // Verify the activation using SSR
    await page.reload();
    await expect(page.getByText("Old variant")).toBeVisible();
    await expect(page.getByText("New variant")).not.toBeVisible();
  });

  test("uses the same cookie for anonymous users after page reload", async ({
    page,
    context,
  }) => {
    // Refreshing 3 times to "make sure" it's consistent
    const previousCookie = await getCookie("progressively-id", context);

    await page.reload();

    const nextCookie1 = await getCookie("progressively-id", context);
    expect(previousCookie).toEqual(nextCookie1);

    await page.reload();

    const nextCookie2 = await getCookie("progressively-id", context);
    expect(previousCookie).toEqual(nextCookie2);

    await page.reload();

    const nextCookie3 = await getCookie("progressively-id", context);
    expect(previousCookie).toEqual(nextCookie3);
  });
});
