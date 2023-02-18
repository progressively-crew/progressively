import { expect, test } from "@progressively/playwright-helpers";
import {
  changeFlagStatus,
  cleanup,
  seed,
} from "@progressively/playwright-helpers/cmd";

test("/", () => {
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
    await expect(page).toContain("Old variant");
    await expect(page).not.toContain("New variant");

    await expect(page).toContain("New footer");
    await expect(page).not.toContain("Old footer");
  });

  test("shows the new variant when the flag is activated for homepage", async ({
    page,
  }) => {
    await changeFlagStatus("1", "1", "ACTIVATED");

    // Verify the activation using sockets
    await expect(page).not.toContain("Old variant");
    await expect(page).toContain("New variant");

    // Verify the activation using SSR
    await page.reload();
    await expect(page).not.toContain("Old variant");
    await expect(page).toContain("New variant");
  });

  test("shows the old variant when the flag is activated for footer (by default activated)", async ({
    page,
  }) => {
    await changeFlagStatus("1", "2", "NOT_ACTIVATED");

    // Verify the activation using sockets
    await expect(page).not.toContain("New variant");
    await expect(page).toContain("Old variant");

    // Verify the activation using SSR
    await page.reload();
    await expect(page).not.toContain("New footer");
    await expect(page).toContain("Old footer");
  });
});
