import { LoaderFunction, redirect } from "remix";
import { getSession } from "~/sessions";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  const authCookie = session.get("auth-cookie");

  if (!authCookie) {
    return redirect(`/signin`);
  }

  return redirect("/dashboard");
};

export default function Index() {
  return <div>Home page</div>;
}
