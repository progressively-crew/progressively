import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { getSession } from "~/sessions";
import { deleteFlag } from "~/modules/flags/services/deleteFlag";
import { Button } from "~/components/Buttons/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { ActionFunction, redirect, V2_MetaFunction } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { Stack } from "~/components/Stack";
import { Typography } from "~/components/Typography";
import { DeleteEntityTitle } from "~/layouts/DeleteEntityTitle";
import { useFlag } from "~/modules/flags/contexts/useFlag";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { DialogCloseBtn } from "~/components/Dialog/Dialog";

export const meta: V2_MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);
  const flagName = getFlagMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${flagName} | Delete`,
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
    `/dashboard/projects/${projectId}/flags?flagRemoved=true#flag-removed`
  );
};

export default function DeleteFlagPage() {
  const navigation = useNavigation();
  const { project } = useProject();
  const { flag } = useFlag();
  const data = useActionData<ActionData>();

  return (
    <DeleteEntityLayout
      error={
        data?.errors &&
        data.errors.backendError && <ErrorBox list={data.errors} />
      }
      titleSlot={
        <DeleteEntityTitle>
          Are you sure you want to delete{" "}
          <span className="text-red-700 font-semibold dark:text-red-400">
            {flag.name}
          </span>
          ?
        </DeleteEntityTitle>
      }
      cancelAction={
        <Button
          variant="tertiary"
          scheme="danger"
          to={`/dashboard/projects/${project.uuid}/flags/${flag.uuid}`}
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
            Delete
          </DeleteButton>
        </Form>
      }
      closeSlot={
        <DialogCloseBtn
          to={`/dashboard/projects/${project.uuid}/flags/${flag.uuid}`}
          label={`Back to flag`}
        />
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
