import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { getSession } from "~/sessions";
import { Button } from "~/components/Buttons/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { Stack } from "~/components/Stack";
import { Typography } from "~/components/Typography";
import { deleteMetric } from "~/modules/flags/services/deleteMetric";
import { BackLink } from "~/components/BackLink";
import { DeleteEntityTitle } from "~/layouts/DeleteEntityTitle";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Metrics | Delete`,
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
    await deleteMetric(
      envId,
      flagId,
      params.metricId!,
      session.get("auth-cookie")
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(
    `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/metrics?metricRemoved=true#metric-removed`
  );
};

export default function DeleteMetricPage() {
  const transition = useTransition();
  const data = useActionData<ActionData>();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();

  const currentFlag = flagEnv.flag;

  return (
    <DeleteEntityLayout
      error={
        data?.errors &&
        data.errors.backendError && <ErrorBox list={data.errors} />
      }
      titleSlot={<DeleteEntityTitle>Deleting a metric</DeleteEntityTitle>}
      cancelAction={
        <Button
          variant="tertiary"
          scheme="danger"
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/metrics`}
        >
          {`Cancel`}
        </Button>
      }
      confirmAction={
        <Form method="post">
          <DeleteButton
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Deleting the metric, please wait..."
          >
            Yes, delete the metric
          </DeleteButton>
        </Form>
      }
      backLinkSlot={
        <BackLink
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/metrics`}
        >
          Back to metrics
        </BackLink>
      }
    >
      <Stack spacing={4}>
        <Typography>
          The metric will be removed from the <strong>feature flag</strong>.
        </Typography>

        <Typography>
          <strong>All the metric related data (including events)</strong> will
          be removed and not available anymore.
        </Typography>
      </Stack>
    </DeleteEntityLayout>
  );
}
