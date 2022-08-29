import { useState, useTransition } from "react";
import { StrategyRuleType } from "~/modules/strategies/types/StrategyRule";
import { getSession } from "~/sessions";
import { validateStrategyForm } from "~/modules/strategies/validators/validateStrategyForm";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { StrategyCreateDTO } from "~/modules/strategies/types";
import { editStrategy } from "~/modules/strategies/services/editStrategy";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { StrategyAudience } from "~/modules/strategies/components/StrategyAudience";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { Header } from "~/components/Header";
import { TextInput } from "~/components/Fields/TextInput";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { FormGroup } from "~/components/Fields/FormGroup";
import { useUser } from "~/modules/user/contexts/useUser";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { useStrategy } from "~/modules/strategies/contexts/useStrategy";
import { getStrategyMetaTitle } from "~/modules/strategies/services/getStrategyMetaTitle";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);
  const strategyName = getStrategyMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | ${strategyName} | Edit`,
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
    await editStrategy(params.stratId!, strategy, session.get("auth-cookie"));

    return redirect(
      `/dashboard/projects/${params.id}/environments/${params.env}/flags/${params.flagId}?strategyUpdated=true#strategy-updated`
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: { backendError: e.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

export default function StrategyEditPage() {
  const transition = useTransition();
  const { user } = useUser();
  const { project } = useProject();
  const { flagEnv } = useFlagEnv();
  const { strategy } = useStrategy();
  const actionData = useActionData<ActionData>();

  const [strategyType, setStrategyType] = useState<StrategyRuleType>(
    strategy.strategyRuleType
  );

  const { environment } = useEnvironment();

  const currentFlag = flagEnv.flag;

  const crumbs: Crumbs = [
    {
      link: "/dashboard",
      label: "Projects",
    },
    {
      link: `/dashboard/projects/${project.uuid}`,
      label: project.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags`,
      label: environment.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`,
      label: currentFlag.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/${strategy.uuid}/edit`,
      label: `Edit ${strategy.name}`,
    },
  ];

  const errors = actionData?.errors || {};

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={<Header title={`Edit ${strategy.name}`} />}
      status={actionData?.errors && <ErrorBox list={actionData.errors} />}
    >
      <Form method="post">
        <FormGroup>
          <TextInput
            name="strategy-name"
            placeholder="e.g: Strategy 1"
            label="Strategy name"
            defaultValue={strategy.name}
            isInvalid={Boolean(errors["strategy-name"])}
          />

          <StrategyAudience
            strategyType={strategyType}
            onStrategyChange={setStrategyType}
            errors={errors}
            initialFieldName={strategy.fieldName}
            initialFieldValue={strategy.fieldValue}
            initialFieldComparator={strategy.fieldComparator}
          />

          <div>
            <SubmitButton
              tabIndex={-1}
              isLoading={transition.state === "submitting"}
              loadingText="Saving the strategy, please wait..."
            >
              Save the strategy
            </SubmitButton>
          </div>
        </FormGroup>
      </Form>
    </DashboardLayout>
  );
}
