import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { getProjects } from "~/modules/projects/services/getProjects";
import { UserProject } from "~/modules/projects/types";
import { getSession } from "~/sessions";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { User } from "~/modules/user/types";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { MetaFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useSearchParams, useLoaderData } from "@remix-run/react";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Spacer } from "~/components/Spacer";
import { ProjectList } from "~/modules/projects/components/ProjectList";
import { Card, CardContent } from "~/components/Card";

export const meta: MetaFunction = () => {
  return {
    title: "Progressively | Projects list",
  };
};

interface LoaderData {
  user: User;
  projects: Array<UserProject>;
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData | Response> => {
  const user = await authGuard(request);

  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const projects = await getProjects(authCookie);

  if (projects.length === 0) {
    return redirect("/dashboard/onboarding");
  }

  return { projects, user };
};

export default function DashboardRoot() {
  const [searchParams] = useSearchParams();
  const { projects, user } = useLoaderData<LoaderData>();

  const newProjectId = searchParams.get("newProjectId") || undefined;
  const hasRemovedProject = searchParams.get("projectRemoved") || undefined;

  return (
    <DashboardLayout
      user={user}
      header={<Header title="Projects" />}
      status={
        newProjectId ? (
          <SuccessBox id="project-added">
            The project has been successfully created.
          </SuccessBox>
        ) : hasRemovedProject ? (
          <SuccessBox id="project-removed">
            The project has been successfully removed.
          </SuccessBox>
        ) : null
      }
    >
      <Section>
        <CreateButton to="/dashboard/projects/create">
          Create a project
        </CreateButton>

        <Spacer size={4} />
        <Card>
          <ProjectList projects={projects} />
        </Card>
      </Section>
    </DashboardLayout>
  );
}
