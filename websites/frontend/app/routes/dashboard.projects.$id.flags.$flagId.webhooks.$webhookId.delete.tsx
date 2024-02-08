import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { getSession } from "~/sessions";
import { Button } from "~/components/Buttons/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { ActionFunction, redirect, MetaFunction } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { Stack } from "~/components/Stack";
import { Typography } from "~/components/Typography";
import { deleteWebhook } from "~/modules/webhooks/services/deleteWebhook";
import { DeleteEntityTitle } from "~/layouts/DeleteEntityTitle";
import { DialogCloseBtn } from "~/components/Dialog/Dialog";
import { useFlag } from "~/modules/flags/contexts/useFlag";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);
  const flagName = getFlagMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${flagName} | Webhooks | Delete`,
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
    await deleteWebhook(params.webhookId!, session.get("auth-cookie"));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(
    `/dashboard/projects/${projectId}/flags/${flagId}/webhooks?webhookRemoved=true#webhook-removed`
  );
};

export default function DeleteWebhookPage() {
  const navigation = useNavigation();
  const data = useActionData<ActionData>();
  const { project } = useProject();
  const { flag } = useFlag();

  return (
    <DeleteEntityLayout
      titleSlot={<DeleteEntityTitle>Deleting a webhook</DeleteEntityTitle>}
      error={
        data?.errors &&
        data.errors.backendError && <ErrorBox list={data.errors} />
      }
      cancelAction={
        <Button
          variant="tertiary"
          scheme="danger"
          to={`/dashboard/projects/${project.uuid}/flags/${flag.uuid}/webhooks`}
        >
          {`Cancel`}
        </Button>
      }
      confirmAction={
        <Form method="post" id="delete-webhooks">
          <DeleteButton
            type="submit"
            isLoading={navigation.state === "submitting"}
            loadingText="Deleting the webhook, please wait..."
            form="delete-webhooks"
          >
            Yes, delete the webhook
          </DeleteButton>
        </Form>
      }
      closeSlot={
        <DialogCloseBtn
          to={`/dashboard/projects/${project.uuid}/flags/${flag.uuid}/webhooks`}
          label={`Back to webhooks`}
        />
      }
    >
      <Stack spacing={4}>
        <Typography>
          The webhook will not be triggered anymore when the associated event
          will occur.
        </Typography>
      </Stack>
    </DeleteEntityLayout>
  );
}
