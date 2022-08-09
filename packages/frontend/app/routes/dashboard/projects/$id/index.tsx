import { BreadCrumbs } from "~/components/Breadcrumbs";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { getSession } from "~/sessions";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { User } from "~/modules/user/types";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { AiOutlineSetting } from "react-icons/ai";
import { FiLayers } from "react-icons/fi";
import { EmptyState } from "~/components/EmptyState";
import { Typography } from "~/components/Typography";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { EnvList } from "~/modules/environments/components/EnvList";
import { Card } from "~/components/Card";

interface MetaArgs {
  data?: {
    project?: Project;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const title = data?.project?.name || "An error ocurred";

  return {
    title: `Progressively | ${title}`,
  };
};

interface LoaderData {
  user: User;
  project: Project;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);
  const session = await getSession(request.headers.get("Cookie"));
  const project = await getProject(params.id!, session.get("auth-cookie"));

  return { user, project };
};

export default function ProjectDetailPage() {
  const { user, project } = useLoaderData<LoaderData>();
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
      header={<Header tagline="Project" title={project.name} />}
      subNav={
        <HorizontalNav label={`Project related`}>
          <NavItem
            to={`/dashboard/projects/${project.uuid}`}
            icon={<FiLayers />}
          >
            Environments
          </NavItem>

          <NavItem
            to={`/dashboard/projects/${project.uuid}/settings`}
            icon={<AiOutlineSetting />}
          >
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
      <Section aria-labelledby="list-env-title" id="list-env-title">
        <SectionHeader
          title="Environments"
          icon={<FiLayers />}
          action={
            hasEnvironments && (
              <CreateButton
                to={`/dashboard/projects/${project.uuid}/environments/create`}
              >
                Create an environment
              </CreateButton>
            )
          }
        />

        {hasEnvironments ? (
          <Card>
            <EnvList
              environments={project.environments}
              projectId={project.uuid}
            />
          </Card>
        ) : (
          <EmptyState
            title="No environments found"
            description={
              <Typography>
                There are no environments yet on this project.
              </Typography>
            }
            action={
              <CreateButton
                to={`/dashboard/projects/${project.uuid}/environments/create`}
              >
                Create an environment
              </CreateButton>
            }
          />
        )}
      </Section>
    </DashboardLayout>
  );
}
