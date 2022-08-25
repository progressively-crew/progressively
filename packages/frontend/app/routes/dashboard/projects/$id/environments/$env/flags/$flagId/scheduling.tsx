import { BreadCrumbs } from "~/components/Breadcrumbs";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { Environment } from "~/modules/environments/types";
import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import { FlagEnv, FlagStatus } from "~/modules/flags/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { ToggleFlag } from "~/modules/flags/components/ToggleFlag";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { MetaFunction, ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { TagLine } from "~/components/Tagline";
import { FiFlag } from "react-icons/fi";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { SliderFlag } from "~/modules/flags/components/SliderFlag";
import { changePercentageFlag } from "~/modules/flags/services/changePercentageFlag";
import { activateFlag } from "~/modules/flags/services/activateFlag";
import { AiOutlineClockCircle } from "react-icons/ai";
import { SchedulingList } from "~/modules/scheduling/components/SchedulingList";
import { Card } from "~/components/Card";
import { Typography } from "~/components/Typography";
import { Schedule } from "~/modules/scheduling/types";
import { getScheduling } from "~/modules/scheduling/services/getScheduling";
import { EmptyState } from "~/components/EmptyState";

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
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Scheduling`,
  };
};

type ActionDataType = null | { successChangePercentage: boolean };

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionDataType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const flagId = params.flagId;
  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "percentage") {
    const rolloutPercentage = formData.get("rolloutPercentage");

    if (
      rolloutPercentage !== undefined &&
      rolloutPercentage !== null &&
      flagId
    ) {
      await changePercentageFlag(
        params.env!,
        flagId as string,
        Number(rolloutPercentage),
        authCookie
      );

      return { successChangePercentage: true };
    }
  }

  const nextStatus = formData.get("nextStatus");

  if (nextStatus && flagId) {
    await activateFlag(
      params.env!,
      flagId as string,
      nextStatus as FlagStatus,
      authCookie
    );
  }

  return null;
};

interface LoaderData {
  project: Project;
  environment: Environment;
  currentFlagEnv: FlagEnv;
  user: User;
  scheduling: Array<Schedule>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);

  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const project: Project = await getProject(params.id!, authCookie);

  const flagsByEnv: Array<FlagEnv> = await getFlagsByProjectEnv(
    params.env!,
    authCookie
  );

  const scheduling: Array<Schedule> = await getScheduling(
    params.env!,
    params.flagId!,
    authCookie
  );

  const environment = project.environments.find(
    (env) => env.uuid === params.env
  );

  const currentFlagEnv = flagsByEnv.find(
    (flagEnv) => flagEnv.flagId === params.flagId!
  )!;

  return {
    project,
    environment: environment!,
    currentFlagEnv,
    user,
    scheduling,
  };
};

export default function SchedulingOfFlag() {
  const actionData = useActionData<ActionDataType>();

  const { project, environment, currentFlagEnv, user, scheduling } =
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
              isSuccessful={Boolean(actionData?.successChangePercentage)}
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
      <Section id="scheduling">
        <SectionHeader
          title="Scheduling"
          icon={<AiOutlineClockCircle />}
          description={
            <Typography>
              The strategies that you have defined will apply at the given
              dates.
            </Typography>
          }
        />

        {scheduling.length === 0 && (
          <EmptyState
            title="No scheduling found"
            description={
              <Typography>There are no scheduling for this flag.</Typography>
            }
          />
        )}

        {scheduling.length > 0 && (
          <Card>
            <SchedulingList scheduling={scheduling} />
          </Card>
        )}
      </Section>
    </DashboardLayout>
  );
}
