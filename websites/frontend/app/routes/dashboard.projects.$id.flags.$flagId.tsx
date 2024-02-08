import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { FlagProvider } from "~/modules/flags/contexts/FlagProvider";
import { getFlagById } from "~/modules/flags/services/getFlagById";
import { Flag } from "~/modules/flags/types";
import { Project } from "~/modules/projects/types";
import { getSession } from "~/sessions";

interface LoaderData {
  project: Project;
}

export const handle = {
  breadcrumb: (match: { data: LoaderData; params: any }, allData: any) => {
    const routeWithFlag = allData.find(
      (d: any) => d.id === "routes/dashboard.projects.$id.flags.$flagId"
    );

    return {
      link: `/dashboard/projects/${match.params.id}/flags/${routeWithFlag.data.flag.uuid}/audience`,
      label: routeWithFlag.data.flag.name,
      isFlag: true,
    };
  },
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const flag: Flag = await getFlagById(params.flagId!, authCookie);

  return {
    flag,
  };
};

export default function ProjectIdLayout() {
  const { flag } = useLoaderData<typeof loader>();

  return (
    <FlagProvider flag={flag}>
      <Outlet />
    </FlagProvider>
  );
}
