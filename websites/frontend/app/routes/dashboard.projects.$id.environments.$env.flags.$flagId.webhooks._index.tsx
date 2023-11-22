import {
  ActionFunction,
  LoaderFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Card, CardContent } from "~/components/Card";
import { EmptyState } from "~/components/EmptyState";
import { PageTitle } from "~/components/PageTitle";
import { Typography } from "~/components/Typography";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { FlagEnvMenu } from "~/modules/flags/components/FlagEnvMenu";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { getWebhooks } from "~/modules/webhooks/services/getWebhooks";
import { Webhook } from "~/modules/webhooks/types";
import { getSession } from "~/sessions";
import { WebhooksList } from "~/modules/webhooks/components/WebhooksList";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);
  const flagName = getFlagEnvMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Webhooks`,
    },
  ];
};

interface LoaderData {
  webhooks: Array<Webhook>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const webhooks: Array<Webhook> = await getWebhooks(
    params.env!,
    params.flagId!,
    authCookie
  );

  return {
    webhooks,
  };
};

type ActionDataType = null | {
  errors?: { [key: string]: string | undefined };
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionDataType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "toggle-flag") {
    return toggleFlagAction(formData, params, authCookie);
  }

  return null;
};

export default function WebhooksPage() {
  const [searchParams] = useSearchParams();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();

  const isWebhookRemoved = searchParams.get("webhookRemoved") || undefined;
  const isWebhookAdded = searchParams.get("newWebhook") || undefined;
  const { webhooks } = useLoaderData<LoaderData>();

  const currentFlag = flagEnv.flag;

  const hasWebhooks = webhooks.length > 0;

  return (
    <DashboardLayout
      subNav={
        <FlagEnvMenu
          projectId={project.uuid}
          envId={environment.uuid}
          flagEnv={flagEnv}
        />
      }
      status={
        isWebhookRemoved ? (
          <SuccessBox id="webhook-removed">
            The webhook has been successfully removed.
          </SuccessBox>
        ) : isWebhookAdded ? (
          <SuccessBox id="webhook-added">
            The webhook has been successfully added.
          </SuccessBox>
        ) : null
      }
    >
      <PageTitle
        value="Webhooks"
        description={
          <Typography>
            The different webhooks to request when specific events occur.
          </Typography>
        }
        action={
          hasWebhooks && (
            <CreateButton
              to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/webhooks/create`}
            >
              Create a webhook
            </CreateButton>
          )
        }
      />

      {!hasWebhooks && (
        <Card>
          <CardContent>
            <EmptyState
              titleAs="h2"
              title="No webhooks found"
              description={"There are no webhooks for this flag."}
              action={
                <CreateButton
                  to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/webhooks/create`}
                >
                  Create a webhook
                </CreateButton>
              }
            />
          </CardContent>
        </Card>
      )}

      {hasWebhooks && (
        <WebhooksList
          webhooks={webhooks}
          projectId={project.uuid}
          envId={environment.uuid}
          flagId={currentFlag.uuid}
        />
      )}
    </DashboardLayout>
  );
}
