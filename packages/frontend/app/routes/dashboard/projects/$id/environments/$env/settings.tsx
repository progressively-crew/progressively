import { Box, Flex, VisuallyHidden } from "@chakra-ui/react";
import { AiOutlineSetting } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { FiFlag, FiKey } from "react-icons/fi";
import { LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { Button } from "~/components/Button";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Header } from "~/components/Header";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Section, SectionHeader } from "~/components/Section";
import { Typography } from "~/components/Typography";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { Environment } from "~/modules/environments/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project, UserProject, UserRoles } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";

interface MetaArgs {
  data?: {
    project?: Project;
    environment?: Environment;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const projectName = data?.project?.name || "An error ocurred";
  const envName = data?.environment?.name || "An error ocurred";

  return {
    title: `Progressively | ${projectName} | ${envName} | Settings`,
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
      forceNotCurrent: true,
    },
  ];

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          title={environment.name}
          startAction={
            <ButtonCopy
              toCopy={environment.clientKey}
              icon={<FiKey aria-hidden />}
            >
              {environment.clientKey}
            </ButtonCopy>
          }
        />
      }
      subNav={
        <HorizontalNav label={`Environment related`}>
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
      }
    >
      {userRole === UserRoles.Admin && (
        <Section id="danger">
          <SectionHeader
            title="Danger zone"
            description={
              <Typography>
                You can delete an environment at any time, but you {`won’t`} be
                able to access its flags will be removed and be falsy in your
                applications. Be sure to know what {`you're`} doing before
                removing an environment.
              </Typography>
            }
          />

          <Flex pb={4} justifyContent={["center", "flex-start"]}>
            <Button
              colorScheme="error"
              to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/delete`}
              leftIcon={<FaTrash aria-hidden />}
              variant="outline"
            >
              Delete{" "}
              <Box as="span" aria-hidden display={["none", "inline"]}>
                {`"${environment.name}"`} forever
              </Box>
              <VisuallyHidden>{`"${environment.name}"`} forever</VisuallyHidden>
            </Button>
          </Flex>
        </Section>
      )}
    </DashboardLayout>
  );
}
