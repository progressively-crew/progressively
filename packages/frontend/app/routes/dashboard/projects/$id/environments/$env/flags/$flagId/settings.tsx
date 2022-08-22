import { BreadCrumbs } from "~/components/Breadcrumbs";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { Environment } from "~/modules/environments/types";
import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import { FlagEnv, FlagStatus } from "~/modules/flags/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project, UserProject, UserRoles } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { AiOutlineSetting } from "react-icons/ai";
import {
  toggleAction,
  ToggleFlag,
} from "~/modules/flags/components/ToggleFlag";
import { Typography } from "~/components/Typography";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { HideMobile } from "~/components/HideMobile";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { MetaFunction, LoaderFunction, ActionFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card, CardContent } from "~/components/Card";
import { Heading } from "~/components/Heading";
import { Stack } from "~/components/Stack";
import { TagLine } from "~/components/Tagline";
import { FiFlag } from "react-icons/fi";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Spacer } from "~/components/Spacer";
import { SliderFlag } from "~/modules/flags/components/SliderFlag";

interface MetaArgs {
  data?: {
    project?: Project;
    environment?: Environment;
    currentFlagEnv?: FlagEnv;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const projectName = data?.project?.name || "An error ocurred";
  const envName = data?.environment?.name || "An error ocurred";
  const flagName = data?.currentFlagEnv?.flag?.name || "An error ocurred";

  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Settings`,
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

export const action: ActionFunction = ({ request, params }): Promise<null> => {
  return toggleAction({ request, params });
};

export default function FlagSettingPage() {
  const { project, environment, currentFlagEnv, user, userRole } =
    useLoaderData<LoaderData>();

  const currentFlag = currentFlagEnv.flag;
  const isFlagActivated = currentFlagEnv.status === FlagStatus.ACTIVATED;

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
          tagline={<TagLine icon={<FiFlag />}>FEATURE FLAG</TagLine>}
          title={currentFlag.name}
          startAction={<ToggleFlag isFlagActivated={isFlagActivated} />}
          endAction={
            <SliderFlag
              isFlagActivated={isFlagActivated}
              initialRolloutPercentage={currentFlagEnv.rolloutPercentage}
            />
          }
        />
      }
      subNav={
        <FlagMenu
          projectId={project.uuid}
          envId={environment.uuid}
          flagId={currentFlag.uuid}
        />
      }
    >
      <Stack spacing={4}>
        <Heading as={"h2"} fontSize="earth" icon={<AiOutlineSetting />}>
          Settings
        </Heading>

        <Card>
          <CardContent>
            <Section id="general">
              <SectionHeader title="General" />
              <Typography>
                The following is the flag key to use inside your application to
                get the flag variation
              </Typography>
              <Spacer size={4} />
              <ButtonCopy toCopy={currentFlag.key}>
                {currentFlag.key}
              </ButtonCopy>
            </Section>
          </CardContent>
        </Card>

        {userRole === UserRoles.Admin && (
          <Card>
            <CardContent>
              <Section id="danger">
                <SectionHeader
                  title="Danger zone"
                  titleAs="h3"
                  description={
                    <Typography>
                      You can delete a feature flag at any time, but you{" "}
                      {`won’t`} be able to access its insights anymore and false
                      will be served to the application using it.
                    </Typography>
                  }
                />

                <div>
                  <DeleteButton
                    to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/delete`}
                  >
                    <span>
                      <span aria-hidden>
                        Delete{" "}
                        <HideMobile>{currentFlag.name} forever</HideMobile>
                      </span>

                      <VisuallyHidden>
                        Delete {currentFlag.name} forever
                      </VisuallyHidden>
                    </span>
                  </DeleteButton>
                </div>
              </Section>
            </CardContent>
          </Card>
        )}
      </Stack>
    </DashboardLayout>
  );
}
