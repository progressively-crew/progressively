import { createCookieSessionStorage } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET || "abcd";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 86_400,
      path: "/",
      sameSite: "lax",
      secrets: [sessionSecret],
    },
  });

export { getSession, commitSession, destroySession };
