import { LocalBrowserType } from "./helpers/BrowserChain";
import { changeFlagStatus } from "./helpers/changeFlagStatus";
import { expect, test, TestConfig } from "./helpers/hooks";

const userCount = process.env.USER_COUNT;
const browserType = process.env.BROWSER_TYPE as LocalBrowserType;

const config: TestConfig = {
  userCount: userCount ? Number(userCount) : 2,
  type: browserType || "chromium",
};

test(
  "[Boolean activation]: everybody receives the same variations at load and update time",
  config,
  async (browsers) => {
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
  }
);
