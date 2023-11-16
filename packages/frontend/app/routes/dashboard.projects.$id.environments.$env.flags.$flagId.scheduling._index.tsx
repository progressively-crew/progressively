import { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Card, CardContent } from "~/components/Card";
import { EmptyState } from "~/components/EmptyState";
import { PageTitle } from "~/components/PageTitle";
import { Typography } from "~/components/Typography";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { FlagEnvMenu } from "~/modules/flags/components/FlagEnvMenu";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { SchedulingList } from "~/modules/scheduling/components/SchedulingList";
import { getScheduling } from "~/modules/scheduling/services/getScheduling";
import { Schedule } from "~/modules/scheduling/types";
import { getSession } from "~/sessions";

export const meta: MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);
  const flagName = getFlagEnvMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Scheduling`,
    },
  ];
};

interface LoaderData {
  scheduling: Array<Schedule>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const scheduling: Array<Schedule> = await getScheduling(
    params.env!,
    params.flagId!,
    authCookie
  );

  return {
    scheduling,
  };
};

type ActionDataType = null | {
  errors?: { [key: string]: string | undefined };
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionDataType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "toggle-flag") {
    return toggleFlagAction(formData, params, authCookie);
  }

  return null;
};

export default function SchedulingOfFlag() {
  const [searchParams] = useSearchParams();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();

  const isScheduleRemoved = searchParams.get("scheduleRemoved") || undefined;
  const isScheduleAdded = searchParams.get("newSchedule") || undefined;
  const { scheduling } = useLoaderData<LoaderData>();

  const currentFlag = flagEnv.flag;

  const hasScheduling = scheduling.length > 0;

  return (
    <DashboardLayout
      subNav={
        <FlagEnvMenu
          projectId={project.uuid}
          envId={environment.uuid}
          flagEnv={flagEnv}
        />
      }
      status={
        isScheduleRemoved ? (
          <SuccessBox id="schedule-removed">
            The schedule has been successfully removed.
          </SuccessBox>
        ) : isScheduleAdded ? (
          <SuccessBox id="schedule-added">
            The schedule has been successfully added.
          </SuccessBox>
        ) : null
      }
    >
      <PageTitle
        value="Scheduling"
        description={
          <Typography>
            Plan feature flag activation at a given date for a given audience.
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

      {!hasScheduling && (
        <Card>
          <CardContent>
            <EmptyState
              titleAs="h2"
              title="No schedule found"
              description={"There are no scheduling for this flag."}
              action={
                <CreateButton
                  to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/scheduling/create`}
                >
                  Create a schedule
                </CreateButton>
              }
            />
          </CardContent>
        </Card>
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
    </DashboardLayout>
  );
}
