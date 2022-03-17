import { createCookieSessionStorage } from "remix";

const sessionSecret = process.env.SESSION_SECRET || "abcd";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 86400,
      path: "/",
      sameSite: "lax",
      secrets: [sessionSecret],
    },
  });

export { getSession, commitSession, destroySession };
