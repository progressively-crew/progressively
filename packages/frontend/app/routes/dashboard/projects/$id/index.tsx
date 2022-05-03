import { Box, Stack, Text } from "@chakra-ui/react";
import {
  LoaderFunction,
  useLoaderData,
  MetaFunction,
  useSearchParams,
} from "remix";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { SuccessBox } from "~/components/SuccessBox";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { getSession } from "~/sessions";
import { IoIosCreate } from "react-icons/io";
import { EnvCard } from "~/modules/environments/components/EnvCard";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { User } from "~/modules/user/types";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { AiOutlineSetting } from "react-icons/ai";
import { FiLayers } from "react-icons/fi";
import { Button } from "~/components/Button";
import { EmptyState } from "~/components/EmptyState";

interface MetaArgs {
  data: {
    project: Project;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const { project } = data;

  return {
    title: `Progressively | ${project.name}`,
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

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={<Header title={project.name} />}
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
    >
      <Section aria-labelledby="list-env-title" id="list-env-title">
        <Stack spacing={2}>
          {newEnvId ? (
            <SuccessBox id="env-added" mb={4}>
              The environment has been successfully created.
            </SuccessBox>
          ) : null}

          {envRemoved ? (
            <SuccessBox id="env-removed" mb={4}>
              The environment has been successfully deleted.
            </SuccessBox>
          ) : null}
        </Stack>

        <SectionHeader
          title="Environments"
          hiddenTitle
          endAction={
            project.environments.length > 0 && (
              <Button
                to={`/dashboard/projects/${project.uuid}/environments/create`}
                leftIcon={<IoIosCreate aria-hidden />}
                colorScheme="brand"
              >
                Create an environment
              </Button>
            )
          }
        />

        {project.environments.map((env, index) => (
          <EnvCard
            noBorder={index === 0}
            key={env.uuid}
            id={env.uuid}
            linkTo={`/dashboard/projects/${project.uuid}/environments/${env.uuid}/flags`}
            title={env.name}
            clientKey={env.clientKey}
          />
        ))}

        {project.environments.length === 0 ? (
          <EmptyState
            title="No environments found"
            description={
              <Text>There are no environments yet on this project.</Text>
            }
            action={
              <Button
                to={`/dashboard/projects/${project.uuid}/environments/create`}
                leftIcon={<IoIosCreate aria-hidden />}
                colorScheme="brand"
              >
                Create an environment
              </Button>
            }
          />
        ) : null}
      </Section>
    </DashboardLayout>
  );
}
