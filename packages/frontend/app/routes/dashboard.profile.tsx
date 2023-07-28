import { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";
import { ProgressivelyProvider } from "@progressively/react";
import { Progressively } from "@progressively/server-side";
import { getEnvVar } from "~/modules/misc/utils/getEnvVar";
import { getMe } from "~/modules/user/services/getMe";
import { getSession } from "~/sessions";
import { User } from "~/modules/user/types";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Progressively | Profile",
    },
  ];
};

interface LoaderData {
  data: any;
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user: User = await getMe(session);
  const progressivelyEnv = getEnvVar("PROGRESSIVELY_ENV")!;
  const progressivelyApiUrl = getEnvVar("BACKEND_URL")!;

  const sdk = Progressively.init(progressivelyEnv, {
    apiUrl: progressivelyApiUrl,
    websocketUrl: progressivelyApiUrl.replace("http", "ws"),
    fields: {
      email: user.email,
    },
  });

  const { data } = await sdk.loadFlags();

  return { data };
};

export default function ProfilePage() {
  const { data } = useLoaderData<LoaderData>();

  return (
    <ProgressivelyProvider {...data}>
      <Outlet />
    </ProgressivelyProvider>
  );
}
