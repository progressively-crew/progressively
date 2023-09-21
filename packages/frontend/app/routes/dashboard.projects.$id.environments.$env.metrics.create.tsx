import { getSession } from "~/sessions";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { ActionFunction, redirect, V2_MetaFunction } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { createMetric } from "~/modules/flags/services/createMetric";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { BackLink } from "~/components/BackLink";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | Metrics | Create`,
    },
  ];
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

  const name = formData.get("name")?.toString();
  const optionalVariant = formData.get("variant")?.toString();

  if (!name) {
    return {
      errors: {
        name: "The name field is required",
      },
    };
  }

  try {
    await createMetric(
      params.env!,
      session.get("auth-cookie"),
      name,
      optionalVariant || undefined
    );

    return redirect(
      `/dashboard/projects/${params.id}/environments/${params.env}/metrics?newMetric=true#metric-added`
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

export default function MetricCreatePage() {
  const { project } = useProject();
  const { environment } = useEnvironment();
  const transition = useTransition();

  const actionData = useActionData<ActionData>();
  const errors = actionData?.errors;

  return (
    <Form method="post" className="flex flex-col flex-1">
      <CreateEntityLayout
        status={actionData?.errors && <ErrorBox list={actionData.errors} />}
        titleSlot={<CreateEntityTitle>Create a metric</CreateEntityTitle>}
        submitSlot={
          <SubmitButton
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Creating the metric, please wait..."
          >
            Create the metric
          </SubmitButton>
        }
        backLinkSlot={
          <BackLink
            to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/metrics`}
          >
            Back to metrics
          </BackLink>
        }
      >
        <FormGroup>
          <TextInput
            isInvalid={Boolean(errors?.name)}
            label="Metric name"
            name="name"
            placeholder="e.g: My super metric"
          />
        </FormGroup>
      </CreateEntityLayout>
    </Form>
  );
}
