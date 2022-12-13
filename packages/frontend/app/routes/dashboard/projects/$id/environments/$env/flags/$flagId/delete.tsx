import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { getSession } from "~/sessions";
import { deleteFlag } from "~/modules/flags/services/deleteFlag";
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
import { BackLink } from "~/components/BackLink";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Delete`,
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
    await deleteFlag(flagId, session.get("auth-cookie"));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(
    `/dashboard/projects/${projectId}/environments/${envId}?flagRemoved=true#flag-removed`
  );
};

export default function DeleteFlagPage() {
  const transition = useTransition();
  const { project } = useProject();
  const { flagEnv } = useFlagEnv();
  const data = useActionData<ActionData>();
  const { environment } = useEnvironment();

  const currentFlag = flagEnv.flag;

  return (
    <DeleteEntityLayout
      error={
        data?.errors &&
        data.errors.backendError && <ErrorBox list={data.errors} />
      }
      titleSlot={
        <h1 className="text-2xl font-semibold" id="page-title">
          Are you sure you want to delete{" "}
          <span className="text-red-700 font-semibold">{currentFlag.name}</span>
          ?
        </h1>
      }
      cancelAction={
        <Button
          variant="tertiary"
          scheme="danger"
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/settings`}
        >
          No, {`don't`} delete {currentFlag.name}
        </Button>
      }
      confirmAction={
        <Form method="post">
          <DeleteButton
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Deleting the environment, please wait..."
          >
            Delete
          </DeleteButton>
        </Form>
      }
      backLinkSlot={
        <BackLink
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}`}
        >
          Back to environment
        </BackLink>
      }
    >
      <Stack spacing={4}>
        <Typography>
          The flag will be removed from all the <strong>environments</strong> of
          the <strong>{project.name}</strong> project.
        </Typography>

        <Typography>
          You won't have access to the <strong>flags analytics</strong> anymore.
        </Typography>

        <Typography>There will be no way to get the data back.</Typography>
      </Stack>
    </DeleteEntityLayout>
  );
}
