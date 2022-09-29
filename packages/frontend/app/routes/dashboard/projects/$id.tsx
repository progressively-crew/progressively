import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { ProjectProvider } from "~/modules/projects/contexts/ProjectProvider";
import { getProject } from "~/modules/projects/services/getProject";
import { Project, UserProject } from "~/modules/projects/types";
import { useUser } from "~/modules/user/contexts/useUser";
import { getSession } from "~/sessions";

interface LoaderData {
  project: Project;
}

export const handle = {
  breadcrumb: (match: { data: LoaderData; params: any }) => {
    return {
      link: `/dashboard/projects/${match.params.id}`,
      label: match.data.project.name,
      isProject: true,
    };
  },
};

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const project: Project = await getProject(
    params.id!,
    session.get("auth-cookie"),
    true
  );

  return { project };
};

export default function ProjectIdLayout() {
  const { project } = useLoaderData<LoaderData>();
  const { user } = useUser();

  const userProject: UserProject | undefined = project.userProject?.find(
    (userProject) => userProject.userId === user.uuid
  );

  return (
    <ProjectProvider project={project} userRole={userProject?.role}>
      <Outlet />
    </ProjectProvider>
  );
}
