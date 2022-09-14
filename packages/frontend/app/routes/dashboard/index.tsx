import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { getProjects } from "~/modules/projects/services/getProjects";
import { UserProject } from "~/modules/projects/types";
import { getSession } from "~/sessions";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { Section } from "~/components/Section";
import { MetaFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useSearchParams, useLoaderData } from "@remix-run/react";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Spacer } from "~/components/Spacer";
import { ProjectList } from "~/modules/projects/components/ProjectList";
import { Card } from "~/components/Card";
import { useUser } from "~/modules/user/contexts/useUser";
import { PageTitle } from "~/components/PageTitle";

export const meta: MetaFunction = () => {
  return {
    title: "Progressively | Projects list",
  };
};

interface LoaderData {
  projects: Array<UserProject>;
}

export const loader: LoaderFunction = async ({ request }): Promise<LoaderData | Response> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const projects = await getProjects(authCookie);

  if (projects.length === 0) {
    return redirect("/dashboard/onboarding");
  }

  return { projects };
};

export default function DashboardRoot() {
  const [searchParams] = useSearchParams();
  const { projects } = useLoaderData<LoaderData>();
  const { user } = useUser();

  const newProjectId = searchParams.get("newProjectId") || undefined;
  const hasRemovedProject = searchParams.get("projectRemoved") || undefined;

  return (
    <DashboardLayout
      user={user}
      header={<PageTitle value="Projects" />}
      status={
        newProjectId ? (
          <SuccessBox id="project-added">The project has been successfully created.</SuccessBox>
        ) : hasRemovedProject ? (
          <SuccessBox id="project-removed">The project has been successfully removed.</SuccessBox>
        ) : null
      }
    >
      <Section>
        <CreateButton to="/dashboard/projects/create">Create a project</CreateButton>

        <Spacer size={4} />

        <Card>
          <ProjectList projects={projects} />
        </Card>
      </Section>
    </DashboardLayout>
  );
}
