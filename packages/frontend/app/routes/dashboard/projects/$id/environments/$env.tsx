import { Outlet, useParams } from "@remix-run/react";
import { EnvProvider } from "~/modules/environments/contexts/EnvProvider";
import { useProject } from "~/modules/projects/contexts/useProject";

export const handle = {
  breadcrumb: (match, matches: any) => {
    const parentProjectMatch = matches[matches.indexOf(match) - 1];
    const environment = parentProjectMatch.data.project.environments.find(
      (env) => env.uuid === match.params.env
    )!;

    return {
      link: `/dashboard/projects/${match.params.id}/environments/${match.params.env}`,
      label: environment.name,
      isEnv: true,
      menuItems: parentProjectMatch.data.project.environments.map((env) => ({
        label: env.name,
        href: `/dashboard/projects/${match.params.id}/environments/${env.uuid}`,
      })),
      menuLabel: `Change environment`,
    };
  },
};

export default function EnvIdLayout() {
  const params = useParams();
  const { project } = useProject();

  const environment = project.environments.find(
    (env) => env.uuid === params.env
  )!;

  return (
    <EnvProvider environment={environment}>
      <Outlet />
    </EnvProvider>
  );
}
