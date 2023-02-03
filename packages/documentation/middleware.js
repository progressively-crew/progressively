import { NextResponse } from "next/server";
import { getProgressivelyData } from "@progressively/server-side";

const ExperimentRoutes = {
  Control: "/",
  A: "/?variant=A",
  B: "/?variant=B",
};

export default async function middleware(request) {
  // Get the user ID from cookies in order to always show them the same variant
  // If showing the same variant to the same user every time is not a concern for you, you can remove this line
  const id = request.cookies.get("progressively-id");

  // Get the feature flags from Progressively
  const { data, response } = await getProgressivelyData(
    process.env.PROGRESSIVELY_ENV,
    {
      apiUrl: "https://backend-progressively.fly.dev",
      fields: {
        id: id?.value || "",
      },
    }
  );

  // Checking that the progressively servers brings us a valid first user id
  // If showing the same variant to the same user every time is not a concern for you, you can remove this line
  const progressivelyId = response.headers.get("x-progressively-id");
  if (!progressivelyId) return;

  let nextRawUrl =
    ExperimentRoutes[data.initialFlags.deploySection] ||
    ExperimentRoutes.Control;

  const nextUrl = NextResponse.rewrite(new URL(nextRawUrl, request.url));
  console.log("Hitting", nextUrl);

  // Stick the user ID to the cookies in order to always show them the same variant
  // If showing the same variant to the same user every time is not a concern for you, you can remove this line
  nextUrl.cookies.set("progressively-id", progressivelyId);

  return nextUrl;
}

export const config = {
  matcher: ["/"],
};
