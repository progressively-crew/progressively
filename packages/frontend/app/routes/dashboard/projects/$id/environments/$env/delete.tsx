import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { deleteEnvironment } from "~/modules/environments/services/deleteEnvironment";
import { getSession } from "~/sessions";
import { Button } from "~/components/Buttons/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { Typography } from "~/components/Typography";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { Stack } from "~/components/Stack";
import { BackLink } from "~/components/BackLink";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);

  return {
    title: `Progressively | ${projectName} | ${envName} | Settings | Delete`,
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

  try {
    await deleteEnvironment(envId, session.get("auth-cookie"));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(
    `/dashboard/projects/${projectId}?envRemoved=true#env-removed`
  );
};

export default function DeleteEnvPage() {
  const transition = useTransition();
  const data = useActionData<ActionData>();
  const { project } = useProject();
  const { environment } = useEnvironment();

  return (
    <DeleteEntityLayout
      titleSlot={
        <h1 className="text-2xl font-semibold" id="page-title">
          Are you sure you want to delete{" "}
          <span className="text-red-700 font-semibold">{environment.name}</span>
          ?
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
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/settings`}
        >
          Cancel
        </Button>
      }
      confirmAction={
        <Form method="post">
          <DeleteButton
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Deleting the environment, please wait..."
          >
            Yes, delete the environment
          </DeleteButton>
        </Form>
      }
      backLinkSlot={
        <BackLink to={`/dashboard/projects/${project.uuid}`}>
          Back to project
        </BackLink>
      }
    >
      <Stack spacing={4}>
        <Typography>
          If you validate the suppression, all the associated{" "}
          <strong>feature flags</strong> will be removed.
        </Typography>

        <Typography>
          You won't have access to the <strong>flags analytics</strong> anymore.
        </Typography>

        <Typography>There will be no way to get the data back.</Typography>
      </Stack>
    </DeleteEntityLayout>
  );
}
