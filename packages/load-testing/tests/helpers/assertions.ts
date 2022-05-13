import { Page } from "playwright";

export function expect(page: Page) {
  return {
    toHaveText: async (str: string) => {
      const result = await page.waitForSelector(`text='${str}'`);

      if (!result) throw new Error(`${str} not found`);
    },
  };
}

export function createCounter(str: string, userCount: number) {
  let _count = 0;

  return {
    increaseWhenVisible: async (page: Page) => {
      const result = await page.$(`text='${str}'`);

      if (result) {
        _count++;
      }
    },
    verifyRange: (startRange: number, endRange: number) => {
      const percentBased = (_count / userCount) * 100;

      if (percentBased < startRange || percentBased > endRange) {
        throw new Error(
          `${str} has been counted ${percentBased} while it was supposed to be between ${startRange} and ${endRange}`
        );
      }
    },
  };
}
