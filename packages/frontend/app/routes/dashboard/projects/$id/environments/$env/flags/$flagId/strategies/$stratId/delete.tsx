import { BreadCrumbs } from "~/components/Breadcrumbs";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { WarningBox } from "~/components/Boxes/WarningBox";
import { getSession } from "~/sessions";
import { deleteStrategy } from "~/modules/strategies/services/deleteStrategy";
import { Button } from "~/components/Buttons/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { useStrategy } from "~/modules/strategies/contexts/useStrategy";
import { getStrategyMetaTitle } from "~/modules/strategies/services/getStrategyMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { Stack } from "~/components/Stack";
import { Typography } from "~/components/Typography";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);
  const strategyName = getStrategyMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | ${strategyName} | Delete`,
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
  const stratId = params.stratId!;

  try {
    await deleteStrategy(stratId, session.get("auth-cookie"));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(
    `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}?stratRemoved=true#strat-removed`
  );
};

export default function DeleteStrategyPage() {
  const transition = useTransition();
  const { project } = useProject();
  const { user } = useUser();
  const { strategy } = useStrategy();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();
  const data = useActionData<ActionData>();

  const currentFlag = flagEnv.flag;

  const crumbs: Crumbs = [
    {
      link: "/dashboard",
      label: "Projects",
      isRoot: true,
    },
    {
      link: `/dashboard/projects/${project.uuid}`,
      label: project.name,
      isProject: true,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}`,
      label: environment.name,
      isEnv: true,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`,
      label: currentFlag.name,
      isFlag: true,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/${strategy.uuid}/delete`,
      label: "Delete a strategy",
    },
  ];

  return (
    <DeleteEntityLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={<PageTitle value={`Deleting a strategy`} />}
      error={
        data?.errors &&
        data.errors.backendError && <ErrorBox list={data.errors} />
      }
      cancelAction={
        <Button
          variant="secondary"
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`}
        >
          {`No, don't delete`} {strategy.name}
        </Button>
      }
      confirmAction={
        <Form method="post">
          <DeleteButton
            variant="primary"
            type="submit"
            scheme=""
            isLoading={transition.state === "submitting"}
            loadingText="Deleting the strategy, please wait..."
          >
            Yes, delete the strategy
          </DeleteButton>
        </Form>
      }
    >
      <Stack spacing={4}>
        <WarningBox title={<>This operation is definitive.</>} />

        <Typography color="hadesLight">
          If you validate the suppression, the strategy will be removed from the
          feature flag.
        </Typography>

        <Typography color="hadesLight">
          When a user will resolve a feature flag, this strategy will NOT apply
          anymore.
        </Typography>
      </Stack>
    </DeleteEntityLayout>
  );
}
