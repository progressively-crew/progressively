import { useTransition } from "react";
import { getSession } from "~/sessions";
import { validateStrategyForm } from "~/modules/strategies/validators/validateStrategyForm";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import {
  AdditionalAudienceCreateDTO,
  StrategyValueToServe,
} from "~/modules/strategies/types";
import { createStrategy } from "~/modules/strategies/services/createStrategy";
import { AudienceFields } from "~/modules/strategies/components/AudienceFields";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { Typography } from "~/components/Typography";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { FormGroup } from "~/components/Fields/FormGroup";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
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

export const handle = {
  breadcrumb: (match: { params: any }) => {
    return {
      link: `/dashboard/projects/${match.params.id}/environments/${match.params.env}/flags/${match.params.flagId}/strategies/create`,
      label: "Create an additional audience",
    };
  },
};

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Strategies | Create`,
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

  const errors = validateStrategyForm(formData);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const fieldName = (formData.get("field-name") as string) || "";
  const fieldValue = (formData.get("field-value") as string) || "";
  const valueToServeType =
    (formData.get("value-to-serve-type") as string) ||
    StrategyValueToServe.Boolean;

  const valueToServe = (formData.get("value-to-serve") as string) || "false"; // keep it as a string, it will be stored in DB like this

  const fieldComparator =
    (formData.get(
      "field-comparator"
    ) as AdditionalAudienceCreateDTO["fieldComparator"]) || undefined;

  const strategy: AdditionalAudienceCreateDTO = {
    fieldComparator: fieldComparator,
    fieldName,
    fieldValue,
    valueToServeType,
    valueToServe,
  };

  try {
    await createStrategy(
      params.env!,
      params.flagId!,
      strategy,
      session.get("auth-cookie")
    );

    return redirect(
      `/dashboard/projects/${params.id}/environments/${params.env}/flags/${params.flagId}?newStrategy=true#strategy-added`
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

export default function StrategyCreatePage() {
  const transition = useTransition();
  const { flagEnv } = useFlagEnv();
  const { project } = useProject();
  const { user } = useUser();
  const { environment } = useEnvironment();
  const actionData = useActionData<ActionData>();

  const currentFlag = flagEnv.flag;

  const errors = actionData?.errors || {};

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
        value="Create an additional audience"
        description={
          <Typography>
            {`You're`} about to create an additional audience to{" "}
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
              <AudienceFields errors={errors} />

              <div>
                <SubmitButton
                  isLoading={transition.state === "submitting"}
                  loadingText="Saving the strategy, please wait..."
                >
                  Save the additional audience
                </SubmitButton>
              </div>
            </FormGroup>
          </Form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
