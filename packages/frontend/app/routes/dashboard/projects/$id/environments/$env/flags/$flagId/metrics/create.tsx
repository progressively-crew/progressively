import { getSession } from "~/sessions";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import {
  MetaFunction,
  ActionFunction,
  redirect,
  LoaderFunction,
} from "@remix-run/node";
import {
  useActionData,
  Form,
  useTransition,
  useLoaderData,
} from "@remix-run/react";
import { useUser } from "~/modules/user/contexts/useUser";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { createMetric } from "~/modules/flags/services/createMetric";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { getVariants } from "~/modules/variants/services/getVariants";
import { SelectField } from "~/components/Fields/SelectField";
import { Variant } from "~/modules/variants/types";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { BackLink } from "~/components/BackLink";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Metrics | Create`,
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
      params.flagId!,
      session.get("auth-cookie"),
      name,
      optionalVariant || undefined
    );

    return redirect(
      `/dashboard/projects/${params.id}/environments/${params.env}/flags/${params.flagId}/metrics?newMetric=true#metric-added`
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

interface LoaderData {
  variants: Array<Variant>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const variants: Array<Variant> = await getVariants(
    params.env!,
    params.flagId!,
    authCookie
  );

  return {
    variants,
  };
};

export default function MetricCreatePage() {
  const { user } = useUser();
  const { project } = useProject();
  const { flagEnv } = useFlagEnv();
  const { environment } = useEnvironment();
  const { variants } = useLoaderData<LoaderData>();
  const transition = useTransition();

  const currentFlag = flagEnv.flag;

  const actionData = useActionData<ActionData>();
  const errors = actionData?.errors;

  const options = [{ value: "", label: "No variant" }];

  for (const variant of variants) {
    options.push({ value: variant.uuid, label: variant.value });
  }

  return (
    <Form method="post">
      <CreateEntityLayout
        status={actionData?.errors && <ErrorBox list={actionData.errors} />}
        titleSlot={
          <h1 className="text-3xl font-semibold" id="page-title">
            Create a metric
          </h1>
        }
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
            to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/metrics`}
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

          <SelectField
            name="variant"
            label="Variant (optional):"
            options={options}
          />
        </FormGroup>
      </CreateEntityLayout>
    </Form>
  );
}
