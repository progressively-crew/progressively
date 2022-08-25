import { useState, useTransition } from "react";

import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import { Flag, FlagEnv, FlagStatus } from "~/modules/flags/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { StrategyRuleType } from "~/modules/strategies/types/StrategyRule";
import { getSession } from "~/sessions";
import { validateStrategyForm } from "~/modules/strategies/validators/validateStrategyForm";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { StrategyCreateDTO } from "~/modules/strategies/types";
import { createStrategy } from "~/modules/strategies/services/createStrategy";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { StrategyAudience } from "~/modules/strategies/components/StrategyAudience";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { User } from "~/modules/user/types";
import { Header } from "~/components/Header";
import { Environment } from "~/modules/environments/types";
import { Typography } from "~/components/Typography";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { Crumbs } from "~/components/Breadcrumbs/types";
import {
  MetaFunction,
  ActionFunction,
  redirect,
  LoaderFunction,
} from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
import { FormGroup } from "~/components/Fields/FormGroup";
import { DateTimeInput } from "~/components/Fields/DateTimeInput";
import { RadioField } from "~/components/Fields/RadioField";
import { SliderInput } from "~/components/Fields/SliderInput";
import { CreateSchedulingFrom } from "~/modules/strategies/components/CreateSchedulingForm";
import { SchedulingCreateDTO } from "~/modules/scheduling/types";
import { createScheduling } from "~/modules/scheduling/services/createScheduling";

interface MetaArgs {
  data?: {
    project?: Project;
    environment?: Environment;
    currentFlag?: Flag;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const projectName = data?.project?.name || "An error ocurred";
  const envName = data?.environment?.name || "An error ocurred";
  const flagName = data?.currentFlag?.name || "An error ocurred";

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

  const timestamp =
    (formData.get("timestamp-dateTime") as unknown as number) || undefined;
  const status =
    (formData.get("nextStatus") as unknown as FlagStatus) || undefined;
  const rolloutPercentage =
    (formData.get("rolloutPercentage") as unknown as number) || undefined;

  if (!timestamp) {
    return {
      errors: {
        timestamp: "The provided date is invalid",
      },
    };
  }

  if (rolloutPercentage === undefined || rolloutPercentage === null) {
    return {
      errors: {
        timestamp: "The rollout percentage is invalid",
      },
    };
  }

  const scheduling: SchedulingCreateDTO = {
    timestamp,
    status,
    rolloutPercentage,
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
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: { backendError: e.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

interface LoaderData {
  project: Project;
  environment: Environment;
  currentFlag: Flag;
  user: User;
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

  const environment = project.environments.find(
    (env) => env.uuid === params.env
  );

  const currentFlag = flagsByEnv.find(
    (flagEnv) => flagEnv.flagId === params.flagId!
  )!.flag;

  return {
    project,
    environment: environment!,
    currentFlag,
    user,
  };
};

export default function SchedulingCreatePage() {
  const { project, environment, currentFlag, user } =
    useLoaderData<LoaderData>();

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
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags`,
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

  const errors = actionData?.errors || {};

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          title="Create a scheduling"
          description={
            <Typography>
              {`You're`} about to create a scheduling to{" "}
              <strong>{currentFlag.name}</strong> in{" "}
              <strong>{project.name}</strong> on{" "}
              <strong>{environment.name}</strong>.
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
