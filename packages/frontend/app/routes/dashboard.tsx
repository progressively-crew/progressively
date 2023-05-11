import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { ProjectsProvider } from "~/modules/projects/contexts/ProjectsProvider";
import { getProjects } from "~/modules/projects/services/getProjects";
import { Project } from "~/modules/projects/types";
import { IsSaasProvider } from "~/modules/saas/contexts/IsSaasProvider";
import { UserProvider } from "~/modules/user/contexts/UserProvider";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";

interface LoaderData {
  user: User;
  projects: Array<Project>;
  isSaas: boolean;
}

export const handle = {
  breadcrumb: () => {
    return {
      link: `/dashboard`,
      label: "Projects",
      isRoot: true,
    };
  },
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const user = await authGuard(request);

  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const projects = await getProjects(authCookie);

  return { user, projects, isSaas: process.env.IS_SAAS === "true" };
};

export default function DashboardLayout() {
  const { user, projects, isSaas } = useLoaderData<LoaderData>();

  return (
    <IsSaasProvider isSaas={isSaas}>
      <ProjectsProvider projects={projects}>
        <UserProvider user={user}>
          <Outlet />
        </UserProvider>
      </ProjectsProvider>
    </IsSaasProvider>
  );
}
