import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { FlagEnvProvider } from "~/modules/flags/contexts/FlagEnvProvider";
import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import { FlagEnv } from "~/modules/flags/types";
import { getSession } from "~/sessions";

interface LoaderData {
  flagEnv: FlagEnv;
}

export const handle = {
  breadcrumb: (match: { data: LoaderData; params: any }) => {
    return {
      link: `/dashboard/projects/${match.params.id}/environments/${match.params.env}/flags/${match.params.flagId}`,
      label: match.data.flagEnv.flag.name,
      isFlag: true,
    };
  },
};

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const flagsByEnv: Array<FlagEnv> = await getFlagsByProjectEnv(
    params.env!,
    authCookie
  );

  const currentFlagEnv = flagsByEnv.find(
    (flagEnv) => flagEnv.flagId === params.flagId!
  )!;

  return {
    flagEnv: currentFlagEnv,
  };
};

export default function FlagEnvByIdLayout() {
  const { flagEnv } = useLoaderData<LoaderData>();

  return (
    <FlagEnvProvider flagEnv={flagEnv}>
      <Outlet />
    </FlagEnvProvider>
  );
}
