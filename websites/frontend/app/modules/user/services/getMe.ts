import { Session } from "@remix-run/node";
import { Constants } from "~/constants";

const refreshToken = (session: Session) => {
  const refreshTokenCookie = session.get("refresh-token");

  return fetch(`${Constants.BackendUrl}/auth/refresh`, {
    headers: {
      "refresh-token": refreshTokenCookie,
    },
  });
};

const getUserWithToken = (accessToken: string) => {
  return fetch(`${Constants.BackendUrl}/users/me`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw res;
    }

    return res.json();
  });
};

/**
 * The most important function for protected routes
 * It checks the validity of the tokens and refresh it if necessary
 */
export const getMe = async (session: Session) => {
  try {
    return await getUserWithToken(session.get("auth-cookie"));
  } catch {
    const response = await refreshToken(session);
    const jsonResponse = await response.json();

    session.set("auth-cookie", jsonResponse.access_token);
    session.set("refresh-token", jsonResponse.access_token);

    return await getUserWithToken(session.get("auth-cookie"));
  }
};
