import { DashboardLayout } from "~/layouts/DashboardLayout";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { Typography } from "~/components/Typography";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/sessions";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | API Documentation`,
    },
  ];
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  return null;
};

export default function SettingsPage() {
  const { project } = useProject();
  const loaderData = useLoaderData<typeof loader>();

  return (
    <DashboardLayout subNav={<ProjectNavBar project={project} />}>
      <PageTitle
        value="Welcome"
        description={
          <Typography as="span">
            Settings available for{" "}
            <strong className="font-bold">{project.name}</strong>.
          </Typography>
        }
      />
      fez
    </DashboardLayout>
  );
}
