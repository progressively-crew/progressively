import { FlagStatus } from "~/modules/flags/types";
import { getSession } from "~/sessions";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { ActionFunction, redirect, V2_MetaFunction } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";
import {
  SchedulingCreateDTO,
  SchedulingType,
} from "~/modules/scheduling/types";
import { createScheduling } from "~/modules/scheduling/services/createScheduling";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";
import { validateScheduling } from "~/modules/scheduling/validators/validateScheduling";
import { CreateSchedulingFrom } from "~/modules/scheduling/components/CreateSchedulingForm";
import { DialogCloseBtn } from "~/components/Dialog/Dialog";

export const handle = {
  breadcrumb: (match: { params: any }) => {
    return {
      link: `/dashboard/projects/${match.params.id}/environments/${match.params.env}/flags/${match.params.flagId}/scheduling/create`,
      label: "Create a scheduling",
    };
  },
};

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);
  const flagName = getFlagEnvMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Scheduling | Create`,
    },
  ];
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

  // Shared fields between single and multi variants
  const utc = formData.get("utc-dateTime")?.toString();
  const status =
    (formData.get("nextStatus") as unknown as FlagStatus) || undefined;

  let createSchedulingDto: Partial<SchedulingCreateDTO> = {};

  createSchedulingDto = {
    utc,
    status,
    type: SchedulingType.UpdatePercentage,
    data: {},
  };

  const errors = validateScheduling(createSchedulingDto);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    await createScheduling(
      params.env!,
      params.flagId!,
      createSchedulingDto,
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
  const navigation = useNavigation();

  const currentFlag = flagEnv.flag;

  const actionData = useActionData<ActionData>();

  return (
    <Form method="post" className="flex flex-col flex-1">
      <CreateEntityLayout
        status={actionData?.errors && <ErrorBox list={actionData.errors} />}
        titleSlot={<CreateEntityTitle>Create a scheduling</CreateEntityTitle>}
        submitSlot={
          <SubmitButton
            isLoading={navigation.state === "submitting"}
            loadingText="Saving the scheduling, please wait..."
          >
            Save the schedule
          </SubmitButton>
        }
        closeSlot={
          <DialogCloseBtn
            to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/scheduling`}
            label={`Back to scheduling`}
          />
        }
      >
        <CreateSchedulingFrom />
      </CreateEntityLayout>
    </Form>
  );
}
