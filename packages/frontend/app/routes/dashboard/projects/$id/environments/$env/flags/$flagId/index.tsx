import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { Section } from "~/components/Section";
import { MetaFunction, ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { PageTitle } from "~/components/PageTitle";
import { Strategy } from "~/modules/strategy/types";
import { getStrategies } from "~/modules/strategy/services/getStrategies";
import { StrategyList } from "~/modules/strategy/components/StrategyList";
import { createStrategy } from "~/modules/strategy/services/createStrategy";
import { deleteStrategy } from "~/modules/strategy/services/deleteStrategy";
import { createStrategyRule } from "~/modules/strategy/services/createStrategyRule";
import { editStrategyAction } from "~/modules/strategy/form-actions/editStrategyAction";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { deleteRule } from "~/modules/rules/services/deleteRule";
import { Variant } from "~/modules/variants/types";
import { getVariants } from "~/modules/variants/services/getVariants";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName}`,
  };
};

type ActionDataType = null | {
  successChangePercentage?: boolean;
  successEdit?: boolean;
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

  if (type === "add-strategy") {
    return await createStrategy(params.env!, params.flagId!, authCookie);
  }

  if (type === "add-strategy-rule") {
    const strategyId = formData.get("uuid")?.toString();

    if (strategyId) {
      return await createStrategyRule(strategyId, authCookie);
    }
  }

  if (type === "delete-strategy") {
    const strategyId = formData.get("uuid")?.toString();
    if (strategyId) {
      return await deleteStrategy(strategyId, authCookie);
    }
  }

  if (type === "toggle-flag") {
    return toggleFlagAction(formData, params, authCookie);
  }

  if (type === "edit-strategy") {
    const strategyId = formData.get("uuid")?.toString();
    if (strategyId) {
      return editStrategyAction(formData, strategyId, authCookie);
    }
  }
  if (type === "delete-strategy-rule") {
    const ruleId = formData.get("ruleId")?.toString();

    if (ruleId) {
      return deleteRule(ruleId, authCookie);
    }
  }

  return null;
};

interface LoaderData {
  strategies: Array<Strategy>;
  variants: Array<Variant>;
}

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const strategies: Array<Strategy> = await getStrategies(
    params.env!,
    params.flagId!,
    authCookie
  );

  const variants: Array<Variant> = await getVariants(
    params.env!,
    params.flagId!,
    authCookie
  );

  return { strategies, variants };
};

/* eslint-disable sonarjs/cognitive-complexity */
export default function FlagById() {
  const actionData = useActionData<ActionDataType>();
  const { project } = useProject();
  const { user } = useUser();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();
  const { strategies, variants } = useLoaderData<LoaderData>();

  return (
    <DashboardLayout
      user={user}
      subNav={
        <FlagMenu
          projectId={project.uuid}
          envId={environment.uuid}
          flagEnv={flagEnv}
        />
      }
    >
      <PageTitle
        value="Audience"
        action={
          <Form method="post">
            <input type="hidden" name="_type" value="add-strategy" />
            <CreateButton
              type="submit"
              variant={strategies.length > 0 ? "secondary" : "primary"}
            >
              Add a strategy
            </CreateButton>
          </Form>
        }
      />

      <Section id="rollout-target">
        <StrategyList items={strategies} variants={variants} />
        <div className="h-4" />
      </Section>
    </DashboardLayout>
  );
}
