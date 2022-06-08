import chalk from "chalk";
import path from "path";

import { BrowserChain, LocalBrowserType } from "./BrowserChain";
import { seedDb, cleanupDb } from "./seed";

const userCount = process.env.USER_COUNT;
const browserType = process.env.BROWSER_TYPE as LocalBrowserType;

const defaultConfig: TestConfig = {
  userCount: userCount ? Number(userCount) : 20,
  type: browserType || "chromium",
};

type TestFn = () => Promise<void>;
const createRunner = () => {
  const _tests: Array<TestFn> = [];

  const registerTest = (testFn: TestFn) => {
    _tests.push(testFn);
  };

  const run = async (filePath: string) => {
    require(path.join(__dirname, "..", filePath));

    for (const testFn of _tests) {
      await testFn();
    }
  };

  return {
    registerTest,
    run,
  };
};

export const runner = createRunner();

export interface TestConfig {
  userCount: number;
  type: LocalBrowserType;
}

export const test = (
  name: string,
  fn: (browserChain: BrowserChain, config: TestConfig) => Promise<unknown>,
  config: TestConfig = defaultConfig
) => {
  const testFn = async () => {
    await seedDb(config.userCount);

    try {
      const browserChain = await BrowserChain.create(
        config.userCount,
        config.type
      );

      await fn(browserChain, config);
      await browserChain.closeAll();
      console.info(chalk.green(`✓ ${name} (${config.userCount} users)`));
    } catch (error) {
      console.error(chalk.red(`FAILED: ${name} (${config.userCount} users)`));
      throw error;
    } finally {
      await cleanupDb();
    }
  };

  runner.registerTest(testFn);
};
