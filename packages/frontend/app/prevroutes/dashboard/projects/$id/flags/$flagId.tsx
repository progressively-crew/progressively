import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { FlagProvider } from "~/modules/flags/contexts/FlagProvider";
import { getFlagById } from "~/modules/flags/services/getFlagById";
import { FlagWithEnvs } from "~/modules/flags/types";
import { getSession } from "~/sessions";

interface LoaderData {
  flag: FlagWithEnvs;
}

export const handle = {
  breadcrumb: (match: { data: LoaderData; params: any }) => {
    return {
      link: `/dashboard/projects/${match.params.id}/flags/${match.params.flagId}`,
      label: match.data.flag.name,
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

  const flag: FlagWithEnvs = await getFlagById(params.flagId!, authCookie);

  return {
    flag,
  };
};

export default function FlagByIdLayout() {
  const { flag } = useLoaderData<LoaderData>();

  return (
    <FlagProvider flag={flag}>
      <Outlet />
    </FlagProvider>
  );
}
