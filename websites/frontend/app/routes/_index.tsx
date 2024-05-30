import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession } from "~/sessions";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  if (!authCookie) {
    throw redirect("/signin");
  }

  return redirect("/dashboard/projects/all");
};

export default function Homepage() {
  return null;
}
