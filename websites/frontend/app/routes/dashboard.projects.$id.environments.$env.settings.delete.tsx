import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { deleteEnvironment } from "~/modules/environments/services/deleteEnvironment";
import { getSession } from "~/sessions";
import { Button } from "~/components/Buttons/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { Typography } from "~/components/Typography";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { ActionFunction, redirect, V2_MetaFunction } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { Stack } from "~/components/Stack";
import { DeleteEntityTitle } from "~/layouts/DeleteEntityTitle";
import { DialogCloseBtn } from "~/components/Dialog/Dialog";

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | Settings | Delete`,
    },
  ];
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
    `/dashboard/projects/${projectId}/flags?envRemoved=true#env-removed`
  );
};

export default function DeleteEnvPage() {
  const navigation = useNavigation();
  const data = useActionData<ActionData>();
  const { project } = useProject();
  const { environment } = useEnvironment();

  return (
    <DeleteEntityLayout
      titleSlot={
        <DeleteEntityTitle>
          Are you sure you want to delete{" "}
          <span className="text-red-700 font-semibold dark:text-red-400">
            {environment.name}
          </span>
          ?
        </DeleteEntityTitle>
      }
      error={
        data?.errors &&
        data.errors.backendError && <ErrorBox list={data.errors} />
      }
      cancelAction={
        <Button
          variant="tertiary"
          scheme="danger"
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}`}
        >
          Cancel
        </Button>
      }
      confirmAction={
        <Form method="post">
          <DeleteButton
            type="submit"
            isLoading={navigation.state === "submitting"}
            loadingText="Deleting the environment, please wait..."
          >
            Yes, delete the environment
          </DeleteButton>
        </Form>
      }
      closeSlot={
        <DialogCloseBtn
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/settings`}
          label={`Back to project`}
        />
      }
    >
      <Stack spacing={4}>
        <Typography>
          All the associated <strong>feature flags</strong> will be removed.
        </Typography>

        <Typography>
          You won't have access to the <strong>flags analytics</strong> anymore.
        </Typography>

        <Typography>There will be no way to get the data back.</Typography>
      </Stack>
    </DeleteEntityLayout>
  );
}
