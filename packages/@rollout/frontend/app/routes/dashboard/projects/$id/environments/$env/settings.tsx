import { Box, Button, Flex, Text, VisuallyHidden } from "@chakra-ui/react";
import { AiOutlineKey, AiOutlineSetting } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { FiFlag } from "react-icons/fi";
import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Header } from "~/components/Header";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Main } from "~/components/Main";
import { Section, SectionHeader } from "~/components/Section";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/auth-guard";
import { Environment } from "~/modules/environments/types";
import { getProject } from "~/modules/projects/getProject";
import { Project, UserProject, UserRoles } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";

interface MetaArgs {
  data: {
    project: Project;
    environment: Environment;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const project = data.project;
  const environment = data.environment;

  return {
    title: `Rollout | ${project.name} | ${environment.name} | Settings`,
  };
};

interface LoaderData {
  project: Project;
  environment: Environment;
  userRole?: UserRoles;
  user: User;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);
  const session = await getSession(request.headers.get("Cookie"));

  const project: Project = await getProject(
    params.id!,
    session.get("auth-cookie"),
    true
  );

  const environment = project.environments.find(
    (env) => env.uuid === params.env
  );

  const userProject: UserProject | undefined = project.userProject?.find(
    (userProject) => userProject.userId === user.uuid
  );

  return {
    project,
    environment: environment!,
    userRole: userProject?.role,
    user,
  };
};

export default function EnvSettingsPage() {
  const { project, environment, userRole, user } = useLoaderData<LoaderData>();

  const crumbs: Crumbs = [
    {
      link: "/dashboard",
      label: "Projects",
    },
    {
      link: `/dashboard/projects/${project.uuid}`,
      label: project.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags`,
      label: environment.name,
    },
  ];

  return (
    <DashboardLayout user={user}>
      <BreadCrumbs crumbs={crumbs} />
      <Main>
        <Box pb={8}>
          <Header
            title={environment.name}
            startAction={
              <ButtonCopy
                toCopy={environment.clientKey}
                icon={<AiOutlineKey aria-hidden />}
                colorScheme="brand"
              >
                {environment.clientKey}
              </ButtonCopy>
            }
          />
        </Box>

        <Box pb={6}>
          <HorizontalNav label={`Environment related navigation`}>
            <NavItem
              to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags`}
              icon={<FiFlag />}
            >
              Feature flags
            </NavItem>

            <NavItem
              to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/settings`}
              icon={<AiOutlineSetting />}
            >
              Settings
            </NavItem>
          </HorizontalNav>
        </Box>

        {userRole === UserRoles.Admin && (
          <Section as="section" id="danger">
            <SectionHeader
              title="Danger zone"
              description={
                <Text>
                  You can delete an environment at any time, but you {`won’t`}{" "}
                  be able to access its flags will be removed and be falsy in
                  your applications. Be sure to know what {`you're`} doing
                  before removing an environment.
                </Text>
              }
            />

            <Flex px={4} pb={4} justifyContent={["center", "unset"]}>
              <Button
                as={Link}
                colorScheme="error"
                to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/delete`}
                leftIcon={<FaTrash aria-hidden />}
                variant="outline"
                width={["100%", "auto"]}
              >
                Delete{" "}
                <Box as="span" aria-hidden display={["none", "inline"]}>
                  {`"${environment.name}"`} forever
                </Box>
                <VisuallyHidden>
                  {`"${environment.name}"`} forever
                </VisuallyHidden>
              </Button>
            </Flex>
          </Section>
        )}
      </Main>
    </DashboardLayout>
  );
}
