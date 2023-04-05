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
import { DashedButton } from "~/components/Buttons/DashedButton";

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

  if (type === "delete-strategy") {
    const strategyId = formData.get("uuid")?.toString();
    if (strategyId) {
      return await deleteStrategy(strategyId, authCookie);
    }
  }

  if (type === "toggle-flag") {
    return toggleFlagAction(formData, params, authCookie);
  }

  return null;
};

interface LoaderData {
  strategies: Array<Strategy>;
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

  return { strategies };
};

/* eslint-disable sonarjs/cognitive-complexity */
export default function FlagById() {
  const actionData = useActionData<ActionDataType>();
  const { project } = useProject();
  const { user } = useUser();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();
  const { strategies } = useLoaderData<LoaderData>();

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
      <PageTitle value="Audience" />

      <Section id="rollout-target">
        <StrategyList items={strategies} />
        <div className="h-4" />

        <Form method="post">
          <input type="hidden" name="_type" value="add-strategy" />
          <DashedButton type="submit">Add a strategy</DashedButton>
        </Form>
      </Section>
    </DashboardLayout>
  );
}
