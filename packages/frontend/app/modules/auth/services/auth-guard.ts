import { redirect } from "remix";
import { getSession } from "~/sessions";
import { getMe } from "../../user/services/getMe";

export const authGuard = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));

  const authCookie = session.get("auth-cookie");

  if (!authCookie) {
    throw redirect(`/401`);
  }

  const user = await getMe(session);

  if (!user?.uuid) {
    throw redirect(`/401`);
  }

  if (!request.url.includes("what-s-your-name") && user?.fullname === "") {
    throw redirect("/dashboard/what-s-your-name");
  }

  return user;
};
