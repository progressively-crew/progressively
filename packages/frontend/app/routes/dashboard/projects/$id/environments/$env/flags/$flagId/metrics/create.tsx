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
import { createMetric } from "~/modules/flags/services/createMetric";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { Section } from "~/components/Section";

export const handle = {
  breadcrumb: (match: { params: any }) => {
    return {
      link: `/dashboard/projects/${match.params.id}/environments/${match.params.env}/flags/${match.params.flagId}/metrics/create`,
      label: "Create a metric",
    };
  },
};

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
      name,
      session.get("auth-cookie")
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

export default function MetricCreatePage() {
  const { user } = useUser();
  const { project } = useProject();
  const { flagEnv } = useFlagEnv();
  const { environment } = useEnvironment();
  const transition = useTransition();

  const currentFlag = flagEnv.flag;

  const actionData = useActionData<ActionData>();
  const errors = actionData?.errors;

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
        value="Create a metric"
        description={
          <Typography>
            {`You're`} about to create a metric to{" "}
            <strong>{currentFlag.name}</strong> in{" "}
            <strong>{project.name}</strong> on{" "}
            <strong>{environment.name}</strong>.
          </Typography>
        }
      />

      <Card>
        <CardContent>
          <Section>
            <Form method="post">
              <FormGroup>
                <TextInput
                  isInvalid={Boolean(errors?.name)}
                  label="Metric name"
                  name="name"
                  placeholder="e.g: My super metric"
                />

                <div>
                  <SubmitButton
                    type="submit"
                    isLoading={transition.state === "submitting"}
                    loadingText="Creating the metric, please wait..."
                  >
                    Create the metric
                  </SubmitButton>
                </div>
              </FormGroup>
            </Form>
          </Section>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
