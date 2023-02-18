import { expect, test } from "@progressively/playwright-helpers";
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
    await page.waitForTimeout(500);
    await cleanup();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows the old variant when the flag is not activated", async ({
    page,
  }) => {
    await expect(page.getByText("Old variant")).toBeVisible();
    await expect(page.getByText("New variant")).not.toBeVisible();

    await expect(page.getByText("New footer")).toBeVisible();
    await expect(page.getByText("Old footer")).not.toBeVisible();
  });

  test.only("shows the new variant when the flag is activated for homepage", async ({
    page,
  }) => {
    await changeFlagStatus("1", "1", "ACTIVATED");

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
    await changeFlagStatus("1", "2", "NOT_ACTIVATED");

    // Verify the activation using sockets
    await expect(page.getByText("Old variant")).toBeVisible();
    await expect(page.getByText("New variant")).not.toBeVisible();
    await expect(page.getByText("New footer")).toBeVisible();
    await expect(page.getByText("Old footer")).not.toBeVisible();

    // Verify the activation using SSR
    await page.reload();
    await expect(page.getByText("Old variant")).toBeVisible();
    await expect(page.getByText("New variant")).not.toBeVisible();
    await expect(page.getByText("Old footer")).toBeVisible();
    await expect(page.getByText("New footer")).not.toBeVisible();
  });
});
