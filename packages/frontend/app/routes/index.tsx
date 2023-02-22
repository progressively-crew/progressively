import { LoaderFunction, redirect } from "@remix-run/node";
import { getHasUsers } from "~/modules/user/services/getHasUsers";

export const loader: LoaderFunction = async () => {
  const { hasUsers } = await getHasUsers();
  if (!hasUsers) return redirect("/welcome");

  return redirect("/signin");
};

export default function Homepage() {
  return null;
}
