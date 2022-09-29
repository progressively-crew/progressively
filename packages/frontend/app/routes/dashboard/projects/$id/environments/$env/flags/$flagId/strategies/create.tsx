import { useState, useTransition } from "react";
import { StrategyRuleType } from "~/modules/strategies/types/StrategyRule";
import { getSession } from "~/sessions";
import { validateStrategyForm } from "~/modules/strategies/validators/validateStrategyForm";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { StrategyCreateDTO } from "~/modules/strategies/types";
import { createStrategy } from "~/modules/strategies/services/createStrategy";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { StrategyAudience } from "~/modules/strategies/components/StrategyAudience";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { Crumbs } from "~/components/Breadcrumbs/types";
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

  const strategyName = formData.get("strategy-name") as string;
  const strategyType = formData.get(
    "strategy-type"
  ) as StrategyCreateDTO["strategyRuleType"];

  const fieldName = (formData.get("field-name") as string) || undefined;
  const fieldValue = (formData.get("field-value") as string) || undefined;

  const fieldComparator =
    (formData.get(
      "field-comparator"
    ) as StrategyCreateDTO["fieldComparator"]) || undefined;

  const strategy: StrategyCreateDTO = {
    name: strategyName,
    strategyRuleType: strategyType,
    fieldComparator: fieldComparator,
    fieldName,
    fieldValue,
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
  const [strategyType, setStrategyType] = useState<StrategyRuleType>("default");

  const currentFlag = flagEnv.flag;

  const crumbs: Crumbs = [
    {
      link: "/dashboard",
      label: "Projects",
      isRoot: true,
    },
    {
      link: `/dashboard/projects/${project.uuid}`,
      label: project.name,
      isProject: true,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}`,
      label: environment.name,
      isEnv: true,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`,
      label: currentFlag.name,
      isFlag: true,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/create`,
      label: "Create a strategy",
    },
  ];

  const errors = actionData?.errors || {};

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          tagline={<TagLine icon={<FlagIcon />}>FEATURE FLAG</TagLine>}
          title={currentFlag.name}
        />
      }
      status={actionData?.errors && <ErrorBox list={actionData.errors} />}
    >
      <PageTitle
        value="Create a strategy"
        description={
          <Typography>
            {`You're`} about to create a strategy to{" "}
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
                name="strategy-name"
                placeholder="e.g: Strategy 1"
                label="Strategy name"
                isInvalid={Boolean(errors["strategy-name"])}
              />

              <StrategyAudience
                strategyType={strategyType}
                onStrategyChange={setStrategyType}
                errors={errors}
              />

              <div>
                <SubmitButton
                  isLoading={transition.state === "submitting"}
                  loadingText="Saving the strategy, please wait..."
                >
                  Save the strategy
                </SubmitButton>
              </div>
            </FormGroup>
          </Form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
