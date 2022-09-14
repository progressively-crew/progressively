import { FlagStatus } from "~/modules/flags/types";
import { getSession } from "~/sessions";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { Typography } from "~/components/Typography";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { CreateSchedulingFrom } from "~/modules/strategies/components/CreateSchedulingForm";
import { SchedulingCreateDTO } from "~/modules/scheduling/types";
import { createScheduling } from "~/modules/scheduling/services/createScheduling";
import { useUser } from "~/modules/user/contexts/useUser";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { PageTitle } from "~/components/PageTitle";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Scheduling | Create`,
  };
};

interface ActionData {
  errors?: { [key: string]: string };
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const formData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));

  const utc = formData.get("utc-dateTime")?.toString();

  const status = (formData.get("nextStatus") as unknown as FlagStatus) || undefined;

  const rolloutPercentage = Number(formData.get("rolloutPercentage")?.toString());

  if (!utc) {
    return {
      errors: {
        utc: "The provided date is invalid",
      },
    };
  }

  if (rolloutPercentage === undefined || rolloutPercentage === null) {
    return {
      errors: {
        utc: "The rollout percentage is invalid",
      },
    };
  }

  const scheduling: SchedulingCreateDTO = {
    utc,
    status,
    rolloutPercentage,
  };

  try {
    await createScheduling(params.env!, params.flagId!, scheduling, session.get("auth-cookie"));

    return redirect(
      `/dashboard/projects/${params.id}/environments/${params.env}/flags/${params.flagId}/scheduling?newSchedule=true#schedule-added`
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: { backendError: e.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

export default function SchedulingCreatePage() {
  const { user } = useUser();
  const { project } = useProject();
  const { flagEnv } = useFlagEnv();
  const { environment } = useEnvironment();

  const currentFlag = flagEnv.flag;

  const actionData = useActionData<ActionData>();

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
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/scheduling/create`,
      label: "Create a scheduling",
    },
  ];

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <PageTitle
          value="Create a scheduling"
          description={
            <Typography>
              {`You're`} about to create a scheduling to <strong>{currentFlag.name}</strong> in{" "}
              <strong>{project.name}</strong> on <strong>{environment.name}</strong>.
            </Typography>
          }
        />
      }
      status={actionData?.errors && <ErrorBox list={actionData.errors} />}
    >
      <Form method="post">
        <CreateSchedulingFrom />
      </Form>
    </DashboardLayout>
  );
}
