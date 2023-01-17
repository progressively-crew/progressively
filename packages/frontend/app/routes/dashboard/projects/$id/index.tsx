import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { Section } from "~/components/Section";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { EmptyState } from "~/components/EmptyState";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import { EnvList } from "~/modules/environments/components/EnvList";
import { Card, CardContent } from "~/components/Card";
import { useUser } from "~/modules/user/contexts/useUser";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { SearchBar } from "~/components/SearchBar";
import { SearchLayout } from "~/layouts/SearchLayout";
import { Spacer } from "~/components/Spacer";

export const meta: MetaFunction = ({ parentsData }) => {
  const projectName = getProjectMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName}`,
  };
};

export default function ProjectDetailPage() {
  const { user } = useUser();
  const { project } = useProject();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const newEnvId = searchParams.get("newEnvId") || undefined;
  const envRemoved = searchParams.get("envRemoved") || undefined;
  const isSearching = Boolean(searchParams.get("search") || undefined);

  const hasEnvironments = project.environments.length > 0;

  const filteredEnvironments = project.environments.filter((env) =>
    env.name.toLowerCase().includes(search || "")
  );

  return (
    <DashboardLayout
      user={user}
      subNav={
        <HorizontalNav label={`Project related`}>
          <NavItem to={`/dashboard/projects/${project.uuid}`}>
            Environments
          </NavItem>

          <NavItem to={`/dashboard/projects/${project.uuid}/settings`}>
            Settings
          </NavItem>
        </HorizontalNav>
      }
      status={
        newEnvId ? (
          <SuccessBox id="env-added">
            The environment has been successfully created.
          </SuccessBox>
        ) : envRemoved ? (
          <SuccessBox id="env-removed">
            The environment has been successfully deleted.
          </SuccessBox>
        ) : null
      }
    >
      <PageTitle value="Environments" />

      <Section aria-label="List of environments">
        {hasEnvironments ? (
          <div>
            <SearchLayout
              actions={
                <CreateButton
                  to={`/dashboard/projects/${project.uuid}/environments/create`}
                >
                  Create an environment
                </CreateButton>
              }
            >
              <SearchBar
                label="Search for environments"
                placeholder="e.g: The environment"
                count={isSearching ? filteredEnvironments.length : undefined}
              />
            </SearchLayout>

            <Spacer size={4} />

            <EnvList
              environments={filteredEnvironments}
              projectId={project.uuid}
            />
          </div>
        ) : (
          <Card>
            <CardContent>
              <EmptyState
                title="No environments found"
                description={"There are no environments yet on this project."}
                action={
                  <CreateButton
                    to={`/dashboard/projects/${project.uuid}/environments/create`}
                  >
                    Create an environment
                  </CreateButton>
                }
              />
            </CardContent>
          </Card>
        )}
      </Section>
    </DashboardLayout>
  );
}
