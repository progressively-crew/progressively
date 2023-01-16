import { FlagStatus } from "~/modules/flags/types";
import { getSession } from "~/sessions";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { CreateSchedulingFrom } from "~/modules/strategies/components/CreateSchedulingForm";
import {
  SchedulingCreateDTO,
  SchedulingType,
} from "~/modules/scheduling/types";
import { createScheduling } from "~/modules/scheduling/services/createScheduling";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { BackLink } from "~/components/BackLink";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";
import { validateScheduling } from "~/modules/scheduling/validators/validateScheduling";

export const handle = {
  breadcrumb: (match: { params: any }) => {
    return {
      link: `/dashboard/projects/${match.params.id}/environments/${match.params.env}/flags/${match.params.flagId}/scheduling/create`,
      label: "Create a scheduling",
    };
  },
};

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Scheduling | Create`,
  };
};

interface ActionData {
  errors: { [key: string]: string };
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const formData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));

  const utc = formData.get("utc-dateTime")?.toString();
  const type = formData.get("type")?.toString() as SchedulingType | undefined;

  const status =
    (formData.get("nextStatus") as unknown as FlagStatus) || undefined;

  const rolloutPercentageFormData = formData
    .get("rolloutPercentage")
    ?.toString();
  const rolloutPercentage = rolloutPercentageFormData
    ? Number(rolloutPercentageFormData)
    : undefined;

  const createSchedulingDto: Partial<SchedulingCreateDTO> = {
    utc,
    status,
    data: { rolloutPercentage },
    type,
  };

  const errors = validateScheduling(createSchedulingDto);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const scheduling: SchedulingCreateDTO = {
    utc: utc!,
    status,
    data: { rolloutPercentage },
    type: type!,
  };

  try {
    await createScheduling(
      params.env!,
      params.flagId!,
      scheduling,
      session.get("auth-cookie")
    );

    return redirect(
      `/dashboard/projects/${params.id}/environments/${params.env}/flags/${params.flagId}/scheduling?newSchedule=true#schedule-added`
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

export default function SchedulingCreatePage() {
  const { project } = useProject();
  const { flagEnv } = useFlagEnv();
  const { environment } = useEnvironment();
  const transition = useTransition();

  const currentFlag = flagEnv.flag;

  const actionData = useActionData<ActionData>();

  return (
    <Form method="post">
      <CreateEntityLayout
        status={actionData?.errors && <ErrorBox list={actionData.errors} />}
        titleSlot={<CreateEntityTitle>Create a scheduling</CreateEntityTitle>}
        submitSlot={
          <SubmitButton
            isLoading={transition.state === "submitting"}
            loadingText="Saving the scheduling, please wait..."
          >
            Save the schedule
          </SubmitButton>
        }
        backLinkSlot={
          <BackLink
            to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/scheduling`}
          >
            Back to scheduling
          </BackLink>
        }
      >
        <CreateSchedulingFrom />
      </CreateEntityLayout>
    </Form>
  );
}
