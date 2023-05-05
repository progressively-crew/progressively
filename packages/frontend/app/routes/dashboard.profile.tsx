import { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";
import { ProgressivelyProvider } from "@progressively/react";
import { getProgressivelyData } from "@progressively/server-side";
import { getEnvVar } from "~/modules/misc/utils/getEnvVar";

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

export const loader: LoaderFunction = async () => {
  const progressivelyEnv = getEnvVar("PROGRESSIVELY_ENV")!;
  const progressivelyApiUrl = getEnvVar("BACKEND_URL")!;

  const { data } = await getProgressivelyData(progressivelyEnv, {
    apiUrl: progressivelyApiUrl,
    websocketUrl: progressivelyApiUrl.replace("http", "ws"),
  });

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
