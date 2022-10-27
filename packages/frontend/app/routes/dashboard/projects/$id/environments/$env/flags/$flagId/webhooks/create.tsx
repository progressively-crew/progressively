import { getSession } from "~/sessions";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { Typography } from "~/components/Typography";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { useUser } from "~/modules/user/contexts/useUser";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { PageTitle } from "~/components/PageTitle";
import { Card, CardContent } from "~/components/Card";
import { Header } from "~/components/Header";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { TagLine } from "~/components/Tagline";
import { WebhookCreationDTO, WebhookEvents } from "~/modules/webhooks/types";
import { createWebhook } from "~/modules/webhooks/services/createWebhook";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { FormGroup } from "~/components/Fields/FormGroup";
import { SelectField } from "~/components/Fields/SelectField";
import { TextInput } from "~/components/Fields/TextInput";

export const handle = {
  breadcrumb: (match: { params: any }) => {
    return {
      link: `/dashboard/projects/${match.params.id}/environments/${match.params.env}/flags/${match.params.flagId}/webhooks/create`,
      label: "Create a webhook",
    };
  },
};

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Webhooks | Create`,
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

  const event =
    (formData.get("event") as unknown as WebhookEvents) || undefined;
  const endpoint = formData.get("endpoint")?.toString();

  if (!event) {
    return {
      errors: {
        utc: "The provided event is invalid",
      },
    };
  }

  if (!endpoint) {
    return {
      errors: {
        utc: "The provided endpoint is invalid",
      },
    };
  }

  const webhook: WebhookCreationDTO = {
    event,
    endpoint,
  };

  try {
    await createWebhook(
      params.env!,
      params.flagId!,
      webhook,
      session.get("auth-cookie")
    );

    return redirect(
      `/dashboard/projects/${params.id}/environments/${params.env}/flags/${params.flagId}/webhooks?newWebhook=true#webhook-added`
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

export default function CreateWebhookPage() {
  const { user } = useUser();
  const { project } = useProject();
  const { flagEnv } = useFlagEnv();
  const { environment } = useEnvironment();
  const transition = useTransition();

  const currentFlag = flagEnv.flag;

  const actionData = useActionData<ActionData>();

  return (
    <DashboardLayout
      user={user}
      header={
        <Header
          tagline={<TagLine icon={<FlagIcon />}>FEATURE FLAG</TagLine>}
          title={currentFlag.name}
        />
      }
      status={actionData?.errors && <ErrorBox list={actionData.errors} />}
    >
      <PageTitle
        value="Create a webhook"
        description={
          <Typography>
            {`You're`} about to create a webhook to{" "}
            <strong>{currentFlag.name}</strong> in{" "}
            <strong>{project.name}</strong> on{" "}
            <strong>{environment.name}</strong>.
          </Typography>
        }
      />
      <Card>
        <CardContent>
          <Form method="post">
            <FormGroup>
              <TextInput
                isInvalid={Boolean(actionData?.errors?.["endpoint"])}
                label="Endpoint:"
                placeholder="e.g: https://api.progressively.app/refresh"
                name="endpoint"
              />

              <SelectField
                name="event"
                label="Event:"
                options={[
                  { value: WebhookEvents.ACTIVATION, label: "Flag activation" },
                  {
                    value: WebhookEvents.DEACTIVATION,
                    label: "Flag deactivation",
                  },
                ]}
              />
              <div>
                <SubmitButton
                  isLoading={transition.state === "submitting"}
                  loadingText="Saving the webhook, please wait..."
                >
                  Save the webhook
                </SubmitButton>
              </div>
            </FormGroup>
          </Form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
