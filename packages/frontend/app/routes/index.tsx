import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return redirect("/signin");
};

export default function Homepage() {
  return null;
}
