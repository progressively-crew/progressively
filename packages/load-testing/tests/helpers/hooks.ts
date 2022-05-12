import chalk from "chalk";
import { Page } from "playwright";
import { BrowserChain, LocalBrowserType } from "./BrowserChain";
import { seedDb, cleanupDb } from "./seed";

export interface TestConfig {
  userCount: number;
  type: LocalBrowserType;
}

export const test = async (
  name: string,
  config: TestConfig,
  fn: (browserChain: BrowserChain) => Promise<unknown>
) => {
  await seedDb(config.userCount);

  try {
    const browserChain = await BrowserChain.create(
      config.userCount,
      config.type
    );

    await fn(browserChain);
    await browserChain.closeAll();
    console.info(chalk.green(`✓ ${name}`));
  } catch (error) {
    console.error(chalk.red(`FAILED: ${name}\n`));
    throw error;
  } finally {
    await cleanupDb();
  }
};

export function expect(page: Page) {
  return {
    toHaveText: async (str: string) => {
      const result = await page.waitForSelector(`text='${str}'`);

      if (!result) throw new Error(`${str} not found`);
    },
  };
}
