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
    await cleanup();
  });

  test("shows the old variant when the flag is not activated", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByText("Old variant")).toBeVisible();
    await expect(page.getByText("New variant")).not.toBeVisible();
  });

  test("shows the new variant when the flag is activated for homepage", async ({
    page,
  }) => {
    await changeFlagStatus("1", "ACTIVATED");

    await page.goto("/");

    await expect(page.getByText("Old variant")).not.toBeVisible();
    await expect(page.getByText("New variant")).toBeVisible();
  });
});
