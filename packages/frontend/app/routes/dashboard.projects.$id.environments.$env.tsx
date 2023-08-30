import { Outlet, useParams } from "@remix-run/react";
import { EnvIcon } from "~/components/Icons/EnvIcon";
import { EnvProvider } from "~/modules/environments/contexts/EnvProvider";
import { useProject } from "~/modules/projects/contexts/useProject";

export const handle = {
  breadcrumb: (match, matches: any) => {
    const parentProjectMatch = matches.find(
      (d: any) => d.id === "routes/dashboard.projects.$id"
    );

    const environment = parentProjectMatch.data.project.environments.find(
      (env) => env.uuid === match.params.env
    )!;

    const currentPath = matches.at(-1).pathname;

    return {
      link: `/dashboard/projects/${match.params.id}/environments/${match.params.env}`,
      label: environment.name,
      isEnv: true,
      menuItems: parentProjectMatch.data.project.environments.map((env) => {
        const nextPath = currentPath.replace(
          `/environments/${match.params.env}`,
          `/environments/${env.uuid}`
        );

        const href =
          nextPath.at(-1) === "/"
            ? nextPath.slice(0, -1)
            : nextPath;

        return {
          label: env.name,
          href,
          icon: <EnvIcon />,
        };
      }),
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
