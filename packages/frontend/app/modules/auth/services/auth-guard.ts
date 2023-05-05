import { redirect } from "@remix-run/node";
import { getSession } from "~/sessions";
import { getMe } from "../../user/services/getMe";

export const authGuard = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const search = new URL(request.url).search;
  const redirectUrl = `/signin${search}`;

  if (!authCookie) {
    throw redirect(redirectUrl);
  }

  const user = await getMe(session);

  if (!user?.uuid) {
    throw redirect(redirectUrl);
  }

  if (!request.url.includes("what-s-your-name") && user?.fullname === "") {
    throw redirect("/dashboard/what-s-your-name");
  }

  return user;
};
