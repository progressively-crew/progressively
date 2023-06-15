import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { ProjectIcon } from "~/components/Icons/ProjectIcon";
import { ProjectProvider } from "~/modules/projects/contexts/ProjectProvider";
import { getProject } from "~/modules/projects/services/getProject";
import { Project, UserProject, UserRoles } from "~/modules/projects/types";
import { useUser } from "~/modules/user/contexts/useUser";
import { getSession } from "~/sessions";

interface LoaderData {
  project: Project;
}

export const handle = {
  breadcrumb: (match: { data: LoaderData; params: any }, allData: any) => {
    const routeWithProjects = allData.find(
      (d: any) => d.id === "routes/dashboard"
    );

    return {
      link: `/dashboard/projects/${match.params.id}/flags`,
      label: match.data.project.name,
      isProject: true,
      menuItems: routeWithProjects.data.projects.map((p: any) => ({
        href: `/dashboard/projects/${p.project.uuid}/flags`,
        label: p.project.name,
        icon: <ProjectIcon />,
      })),
      menuLabel: `Change project`,
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
    <ProjectProvider
      project={project}
      userRole={userProject?.role || UserRoles.User}
    >
      <Outlet />
    </ProjectProvider>
  );
}
