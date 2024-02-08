import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { getProjects } from "~/modules/projects/services/getProjects";
import { UserProject } from "~/modules/projects/types";
import { getSession } from "~/sessions";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { LoaderFunction, redirect, MetaFunction } from "@remix-run/node";
import { useSearchParams, useLoaderData } from "@remix-run/react";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { ProjectList } from "~/modules/projects/components/ProjectList";
import { PageTitle } from "~/components/PageTitle";
import { SearchBar } from "~/components/SearchBar";
import { SearchLayout } from "~/layouts/SearchLayout";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Progressively | Projects list",
    },
  ];
};

interface LoaderData {
  projects: Array<UserProject>;
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData | Response> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const projects: Array<UserProject> = await getProjects(authCookie);

  if (projects.length === 0) {
    return redirect("/dashboard/onboarding");
  }

  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const filteredProjects = projects.filter((project) =>
    project.project.name.toLowerCase().includes(search || "")
  );

  return { projects: filteredProjects };
};

export default function DashboardRoot() {
  const [searchParams] = useSearchParams();
  const { projects } = useLoaderData<LoaderData>();

  const hasRemovedProject = searchParams.get("projectRemoved") || undefined;
  const isSearching = Boolean(searchParams.get("search") || undefined);

  return (
    <DashboardLayout
      status={
        hasRemovedProject ? (
          <SuccessBox id="project-removed">
            The project has been successfully removed.
          </SuccessBox>
        ) : null
      }
    >
      <PageTitle value="Projects" />

      <SearchLayout
        actions={
          <CreateButton to="/dashboard/projects/create">
            Create a project
          </CreateButton>
        }
      >
        <SearchBar
          label="Search for projects"
          placeholder="e.g: The project"
          count={isSearching ? projects.length : undefined}
        />
      </SearchLayout>

      <ProjectList projects={projects} />
    </DashboardLayout>
  );
}
