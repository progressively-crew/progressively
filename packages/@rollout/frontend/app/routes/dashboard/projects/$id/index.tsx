import { Box, Stack } from "@chakra-ui/react";
import {
  LoaderFunction,
  useLoaderData,
  MetaFunction,
  useSearchParams,
} from "remix";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { Main } from "~/components/Main";
import { SuccessBox } from "~/components/SuccessBox";
import { getProject } from "~/modules/projects/getProject";
import { Project } from "~/modules/projects/types";
import { getSession } from "~/sessions";
import { IoIosCreate } from "react-icons/io";
import { EnvCard } from "~/modules/environments/EnvCard";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/auth-guard";
import { User } from "~/modules/user/types";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { AiOutlineSetting } from "react-icons/ai";
import { FiLayers } from "react-icons/fi";
import { Button } from "~/components/Button";

interface MetaArgs {
  data: {
    project: Project;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const { project } = data;

  return {
    title: `Rollout | ${project.name}`,
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
    <DashboardLayout user={user}>
      <BreadCrumbs crumbs={crumbs} />

      <Main>
        <Box pb={[0, 8]}>
          <Header title={project.name} />
        </Box>

        <Box pb={6}>
          <HorizontalNav label={`Project related navigation`}>
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
        </Box>

        <Section aria-labelledby="list-env-title" id="list-env-title">
          <SectionHeader
            title="Environments"
            endAction={
              <Button
                to={`/dashboard/projects/${project.uuid}/environments/create`}
                leftIcon={<IoIosCreate aria-hidden />}
                colorScheme="brand"
              >
                Create an environment
              </Button>
            }
          />

          <Stack spacing={2}>
            <Box px={4}>
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

              {project.environments.map((env) => (
                <EnvCard
                  key={env.uuid}
                  id={env.uuid}
                  linkTo={`/dashboard/projects/${project.uuid}/environments/${env.uuid}/flags`}
                  title={env.name}
                  clientKey={env.clientKey}
                />
              ))}
            </Box>
          </Stack>
        </Section>
      </Main>
    </DashboardLayout>
  );
}
