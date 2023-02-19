import type { BrowserContext } from "@playwright/test";

export * from "@playwright/test";
export const getCookie = async (name: string, ctx: BrowserContext) => {
  const cookies = await ctx.cookies();

  return cookies.find((cookie) => cookie.name === name)?.value;
};
