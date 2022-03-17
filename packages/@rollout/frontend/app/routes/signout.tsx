import { LoaderFunction, redirect } from "remix";
import { destroySession, getSession } from "~/sessions";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/signin", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function SignoutPage() {
  return null;
}
