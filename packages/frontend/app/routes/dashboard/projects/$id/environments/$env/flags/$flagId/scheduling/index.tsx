import { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiFlag } from "react-icons/fi";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { WarningBox } from "~/components/Boxes/WarningBox";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Card } from "~/components/Card";
import { EmptyState } from "~/components/EmptyState";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { Spacer } from "~/components/Spacer";
import { TagLine } from "~/components/Tagline";
import { Typography } from "~/components/Typography";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { ToggleFlag } from "~/modules/flags/components/ToggleFlag";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { FlagStatus } from "~/modules/flags/types";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { SchedulingList } from "~/modules/scheduling/components/SchedulingList";
import { getScheduling } from "~/modules/scheduling/services/getScheduling";
import { Schedule } from "~/modules/scheduling/types";
import { useUser } from "~/modules/user/contexts/useUser";
import { getSession } from "~/sessions";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Scheduling`,
  };
};

type ActionDataType = null | { successChangePercentage: boolean };

export const action: ActionFunction = async ({ request, params }): Promise<ActionDataType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "toggle-flag") {
    return toggleFlagAction(formData, params, authCookie);
  }

  return null;
};

interface LoaderData {
  scheduling: Array<Schedule>;
}

export const loader: LoaderFunction = async ({ request, params }): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const scheduling: Array<Schedule> = await getScheduling(params.env!, params.flagId!, authCookie);

  return {
    scheduling,
  };
};

export default function SchedulingOfFlag() {
  const [searchParams] = useSearchParams();
  const { user } = useUser();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();

  const isScheduleRemoved = searchParams.get("scheduleRemoved") || undefined;
  const isScheduleAdded = searchParams.get("newSchedule") || undefined;
  const { scheduling } = useLoaderData<LoaderData>();

  const currentFlag = flagEnv.flag;

  const isFlagActivated = flagEnv.status === FlagStatus.ACTIVATED;

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
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}`,
      label: environment.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/scheduling`,
      label: currentFlag.name,
    },
  ];

  const hasScheduling = scheduling.length > 0;

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          tagline={<TagLine icon={<FiFlag />}>FEATURE FLAG</TagLine>}
          title={currentFlag.name}
          startAction={<ToggleFlag isFlagActivated={isFlagActivated} />}
        />
      }
      subNav={
        <FlagMenu projectId={project.uuid} envId={environment.uuid} flagId={currentFlag.uuid} />
      }
      status={
        isScheduleRemoved ? (
          <SuccessBox id="schedule-updated">The schedule has been successfully removed.</SuccessBox>
        ) : isScheduleAdded ? (
          <SuccessBox id="schedule-added">The schedule has been successfully added.</SuccessBox>
        ) : null
      }
    >
      <Section id="scheduling">
        <SectionHeader
          title="Scheduling"
          icon={<AiOutlineClockCircle />}
          description={
            <Typography>
              The strategies that you have defined will apply at the given dates.
            </Typography>
          }
          action={
            hasScheduling && (
              <CreateButton
                to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/scheduling/create`}
              >
                Create a schedule
              </CreateButton>
            )
          }
        />

        {flagEnv.variants.length > 0 && (
          <>
            <WarningBox
              title={
                <>
                  Only flag without variants are concerned by the scheduling. However, multi
                  variants scheduling may come in the future.
                </>
              }
            />
            <Spacer size={4} />
          </>
        )}

        {!hasScheduling && (
          <EmptyState
            title="No schedule found"
            description={<Typography>There are no scheduling for this flag.</Typography>}
            action={
              <CreateButton
                to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/scheduling/create`}
              >
                Create a schedule
              </CreateButton>
            }
          />
        )}

        {hasScheduling && (
          <Card>
            <SchedulingList
              scheduling={scheduling}
              projectId={project.uuid}
              envId={environment.uuid}
              flagId={currentFlag.uuid}
            />
          </Card>
        )}
      </Section>
    </DashboardLayout>
  );
}
