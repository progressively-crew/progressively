import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { WarningBox } from "~/components/Boxes/WarningBox";
import { getSession } from "~/sessions";
import { Button } from "~/components/Buttons/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { deleteSchedule } from "~/modules/scheduling/services/deleteSchedule";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { Stack } from "~/components/Stack";
import { Typography } from "~/components/Typography";
import { BackLink } from "~/components/BackLink";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Scheduling | Delete`,
  };
};

interface ActionData {
  errors?: {
    backendError?: string;
  };
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const session = await getSession(request.headers.get("Cookie"));
  const projectId = params.id!;
  const envId = params.env!;
  const flagId = params.flagId!;

  try {
    await deleteSchedule(params.scheduleId!, session.get("auth-cookie"));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(
    `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/scheduling?scheduleRemoved=true#schedule-removed`
  );
};

export default function DeleteSchedulePage() {
  const transition = useTransition();
  const data = useActionData<ActionData>();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();

  const currentFlag = flagEnv.flag;

  return (
    <DeleteEntityLayout
      titleSlot={
        <h1 className="text-3xl font-semibold" id="page-title">
          Deleting a schedule
        </h1>
      }
      error={
        data?.errors &&
        data.errors.backendError && <ErrorBox list={data.errors} />
      }
      cancelAction={
        <Button
          variant="tertiary"
          scheme="danger"
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/scheduling`}
        >
          {`No, don't delete`}
        </Button>
      }
      confirmAction={
        <Form method="post">
          <DeleteButton
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Deleting the schedule, please wait..."
          >
            Yes, delete the schedule
          </DeleteButton>
        </Form>
      }
      backLinkSlot={
        <BackLink
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/scheduling`}
        >
          Back to scheduling
        </BackLink>
      }
    >
      <Stack spacing={4}>
        <WarningBox title={<>This operation is definitive.</>} />

        <Typography>
          If you validate the suppression, the schedule will be removed from the
          feature flag.
        </Typography>

        <Typography>
          It will not change the flag status at the specified date anymore.
        </Typography>
      </Stack>
    </DeleteEntityLayout>
  );
}
