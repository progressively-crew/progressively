import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { deleteProject } from "~/modules/projects/services/deleteProject";
import { getSession } from "~/sessions";
import { Button } from "~/components/Buttons/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { Typography } from "~/components/Typography";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { Stack } from "~/components/Stack";
import { DeleteEntityTitle } from "~/layouts/DeleteEntityTitle";
import { DialogCloseBtn } from "~/components/Dialog/Dialog";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Delete`,
    },
  ];
};

interface ActionData {
  errors: {
    backendError?: string;
  };
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const session = await getSession(request.headers.get("Cookie"));

  try {
    await deleteProject(params.id!, session.get("auth-cookie"));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          backendError: error.message,
        },
      };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(`/dashboard?projectRemoved=true#project-removed`);
};

export default function DeleteProjectPage() {
  const navigation = useNavigation();
  const { project } = useProject();

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
          <span className="text-red-700 font-semibold">{project.name}</span>?
        </DeleteEntityTitle>
      }
      cancelAction={
        <Button
          to={`/dashboard/projects/${project.uuid}/settings`}
          variant="tertiary"
          scheme="danger"
        >
          Cancel
        </Button>
      }
      confirmAction={
        <Form method="post">
          <DeleteButton
            type="submit"
            isLoading={navigation.state === "submitting"}
            loadingText="Deleting the project, please wait..."
          >
            Yes, delete the project
          </DeleteButton>
        </Form>
      }
      closeSlot={
        <DialogCloseBtn
          to={`/dashboard/projects/${project.uuid}/settings`}
          label={`Back to project`}
        />
      }
    >
      <Stack spacing={4}>
        <Typography>
          All the <strong>environments</strong> of the project, and all the
          associated <strong>feature flags</strong> will be removed.
        </Typography>

        <Typography>
          You {`won't`} have access to the <strong>flags analytics</strong>{" "}
          anymore.
        </Typography>

        <Typography>There will be no way to get the data back.</Typography>
      </Stack>
    </DeleteEntityLayout>
  );
}
