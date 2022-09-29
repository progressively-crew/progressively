import { Outlet, useParams } from "@remix-run/react";
import { EnvProvider } from "~/modules/environments/contexts/EnvProvider";
import { useProject } from "~/modules/projects/contexts/useProject";

export const handle = {
  breadcrumb: (match, matches) => {
    const parentProjectMatch = matches[matches.indexOf(match) - 1];
    const environment = parentProjectMatch.data.project.environments.find(
      (env) => env.uuid === match.params.env
    )!;

    return {
      link: `/dashboard/projects/${match.params.id}/environments/${match.params.env}`,
      label: environment.name,
      isEnv: true,
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
