import { Box, Flex, Text, VisuallyHidden } from "@chakra-ui/react";
import { useLoaderData, LoaderFunction, MetaFunction } from "remix";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { ButtonCopy } from "~/components/ButtonCopy";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/auth-guard";
import { Environment } from "~/modules/environments/types";
import { getFlagsByProjectEnv } from "~/modules/flags/getFlagsByProjectEnv";
import { FlagEnv } from "~/modules/flags/types";
import { getProject } from "~/modules/projects/getProject";
import { Project, UserProject, UserRoles } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
import { IoIosFlag } from "react-icons/io";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { AiOutlineBarChart, AiOutlineSetting } from "react-icons/ai";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { FaPowerOff, FaTrash } from "react-icons/fa";
import { Button } from "~/components/Button";

interface MetaArgs {
  data: {
    project: Project;
    environment: Environment;
    currentFlagEnv: FlagEnv;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const project = data.project;
  const environment = data.environment;
  const currentFlagEnv = data.currentFlagEnv;
  const { flag } = currentFlagEnv;

  return {
    title: `Rollout | ${project.name} | ${environment.name} | ${flag.name} | Settings`,
  };
};

interface LoaderData {
  project: Project;
  environment: Environment;
  currentFlagEnv: FlagEnv;
  user: User;
  userRole?: UserRoles;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);

  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const project: Project = await getProject(params.id!, authCookie, true);

  const flagsByEnv: Array<FlagEnv> = await getFlagsByProjectEnv(
    params.id!,
    params.env!,
    authCookie
  );

  const environment = project.environments.find(
    (env) => env.uuid === params.env
  );

  const currentFlagEnv = flagsByEnv.find(
    (flagEnv) => flagEnv.flagId === params.flagId!
  )!;

  const userProject: UserProject | undefined = project.userProject?.find(
    (userProject) => userProject.userId === user.uuid
  );

  return {
    project,
    environment: environment!,
    currentFlagEnv,
    user,
    userRole: userProject?.role,
  };
};

export default function FlagSettingPage() {
  const { project, environment, currentFlagEnv, user, userRole } =
    useLoaderData<LoaderData>();

  const currentFlag = currentFlagEnv.flag;

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
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`,
      label: currentFlag.name,
      forceNotCurrent: true,
    },
  ];

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          title={currentFlag.name}
          startAction={
            <ButtonCopy
              toCopy={currentFlag.key}
              icon={<IoIosFlag aria-hidden />}
              variant="outline"
              colorScheme={"brand"}
            >
              {currentFlag.key}
            </ButtonCopy>
          }
        />
      }
      subNav={
        <HorizontalNav label={`Environment related`}>
          <NavItem
            to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`}
            icon={<FaPowerOff />}
          >
            Rollout status
          </NavItem>

          <NavItem
            to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/insights`}
            icon={<AiOutlineBarChart />}
          >
            Insights
          </NavItem>

          <NavItem
            to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/settings`}
            icon={<AiOutlineSetting />}
          >
            Settings
          </NavItem>
        </HorizontalNav>
      }
    >
      {userRole === UserRoles.Admin && (
        <Section id="danger">
          <SectionHeader
            title="Danger zone"
            description={
              <Text>
                You can delete a feature flag at any time, but you {`won’t`} be
                able to access its insights anymore and false will be served to
                the application using it.
              </Text>
            }
          />

          <Flex px={4} pb={4} justifyContent={["center", "flex-start"]}>
            <Button
              colorScheme="error"
              to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/delete`}
              leftIcon={<FaTrash aria-hidden />}
              variant="outline"
            >
              Delete{" "}
              <Box as="span" aria-hidden display={["none", "inline"]}>
                {`"${currentFlag.name}"`} forever
              </Box>
              <VisuallyHidden>{`"${currentFlag.name}"`} forever</VisuallyHidden>
            </Button>
          </Flex>
        </Section>
      )}
    </DashboardLayout>
  );
}
