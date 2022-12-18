import { createCookieSessionStorage } from "@remix-run/node";
import { Constants } from "./constants";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",
      httpOnly: true,
      secure: Constants.NodeEnv !== "development",
      maxAge: 86_400,
      path: "/",
      sameSite: "lax",
      secrets: [Constants.SessionSecret],
    },
  });

export { getSession, commitSession, destroySession };
