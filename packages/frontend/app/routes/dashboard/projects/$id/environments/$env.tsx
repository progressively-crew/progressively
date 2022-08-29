import { Outlet, useParams } from "@remix-run/react";
import { EnvProvider } from "~/modules/environments/contexts/EnvProvider";
import { useProject } from "~/modules/projects/contexts/useProject";

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
