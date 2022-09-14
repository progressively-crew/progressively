import { BreadCrumbs } from "~/components/Breadcrumbs";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { WarningBox } from "~/components/Boxes/WarningBox";
import { getSession } from "~/sessions";
import { Button } from "~/components/Buttons/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form, useTransition, useParams } from "@remix-run/react";
import { deleteSchedule } from "~/modules/scheduling/services/deleteSchedule";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { PageTitle } from "~/components/PageTitle";

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
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: { backendError: e.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(
    `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/scheduling?scheduleRemoved=true#schedule-removed`
  );
};

export default function DeleteSchedulePage() {
  const transition = useTransition();
  const params = useParams();
  const data = useActionData<ActionData>();
  const { project } = useProject();
  const { user } = useUser();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();

  const currentFlag = flagEnv.flag;

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
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`,
      label: currentFlag.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/scheduling/${params.scheduleId}/delete`,
      label: "Delete a schedule",
    },
  ];

  const warnings = {
    "turned-off":
      "The feature flag will not take this schedule into consideration when being evaluated.",
  };

  return (
    <DeleteEntityLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={<PageTitle value={`Deleting a schedule`} />}
      error={data?.errors && data.errors.backendError && <ErrorBox list={data.errors} />}
      cancelAction={
        <Button
          variant="secondary"
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/scheduling`}
        >
          {`No, don't delete`}
        </Button>
      }
      confirmAction={
        <Form method="post">
          <DeleteButton
            variant="primary"
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Deleting the schedule, please wait..."
          >
            Yes, delete the schedule
          </DeleteButton>
        </Form>
      }
    >
      <WarningBox
        list={warnings}
        title={
          <>
            We really want to warn you: if you validate the schedule suppression, it won't apply
            anymore.
          </>
        }
      />
    </DeleteEntityLayout>
  );
}
