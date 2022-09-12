import { BreadCrumbs } from "~/components/Breadcrumbs";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { AiOutlineSetting } from "react-icons/ai";
import { EmptyState } from "~/components/EmptyState";
import { Typography } from "~/components/Typography";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { EnvList } from "~/modules/environments/components/EnvList";
import { Card } from "~/components/Card";
import { TagLine } from "~/components/Tagline";
import { useUser } from "~/modules/user/contexts/useUser";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { ProjectIcon } from "~/components/Icons/ProjectIcon";
import { EnvIcon } from "~/components/Icons/EnvIcon";

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
  const newEnvId = searchParams.get("newEnvId") || undefined;
  const envRemoved = searchParams.get("envRemoved") || undefined;

  const crumbs: Crumbs = [
    {
      link: "/dashboard",
      label: "Projects",
    },
    {
      link: `/dashboard/projects/${project.uuid}`,
      label: project.name,
    },
  ];

  const hasEnvironments = project.environments.length > 0;

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header tagline={<TagLine icon={<ProjectIcon />}>PROJECT</TagLine>} title={project.name} />
      }
      subNav={
        <HorizontalNav label={`Project related`}>
          <NavItem to={`/dashboard/projects/${project.uuid}`} icon={<EnvIcon />}>
            Environments
          </NavItem>

          <NavItem to={`/dashboard/projects/${project.uuid}/settings`} icon={<AiOutlineSetting />}>
            Settings
          </NavItem>
        </HorizontalNav>
      }
      status={
        newEnvId ? (
          <SuccessBox id="env-added">The environment has been successfully created.</SuccessBox>
        ) : envRemoved ? (
          <SuccessBox id="env-removed">The environment has been successfully deleted.</SuccessBox>
        ) : null
      }
    >
      <PageTitle
        value="Environments"
        icon={<EnvIcon />}
        action={
          hasEnvironments && (
            <CreateButton to={`/dashboard/projects/${project.uuid}/environments/create`}>
              Create an environment
            </CreateButton>
          )
        }
      />

      <Section aria-label="List of environments">
        {hasEnvironments ? (
          <Card>
            <EnvList environments={project.environments} projectId={project.uuid} />
          </Card>
        ) : (
          <EmptyState
            title="No environments found"
            description={<Typography>There are no environments yet on this project.</Typography>}
            action={
              <CreateButton to={`/dashboard/projects/${project.uuid}/environments/create`}>
                Create an environment
              </CreateButton>
            }
          />
        )}
      </Section>
    </DashboardLayout>
  );
}
