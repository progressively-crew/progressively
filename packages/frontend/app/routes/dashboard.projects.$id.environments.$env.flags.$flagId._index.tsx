import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { Section } from "~/components/Section";
import {
  ActionFunction,
  LoaderFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { FlagEnvMenu } from "~/modules/flags/components/FlagEnvMenu";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
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
import { EmptyState } from "~/components/EmptyState";
import { Card, CardContent } from "~/components/Card";
import { Segment } from "~/modules/segments/types";
import { getSegments } from "~/modules/segments/services/getSegments";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { Typography } from "~/components/Typography";

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);
  const flagName = getFlagEnvMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName}`,
    },
  ];
};

type ActionDataType = null | {
  successChangePercentage?: boolean;
  successEdit?: boolean;
  errors?: { [key: string]: string | undefined };
  successStrategyEdited?: boolean;
  successStrategyDeleted?: boolean;
  ruleErrors?: {
    ruleAudience: string;
  };
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
      await deleteStrategy(strategyId, authCookie);

      return {
        successStrategyDeleted: true,
      };
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
  segments: Array<Segment>;
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

  const segments: Array<Segment> = await getSegments(
    params.env!,
    params.flagId!,
    authCookie
  );

  return { strategies, variants, segments };
};

/* eslint-disable sonarjs/cognitive-complexity */
export default function FlagById() {
  const actionData = useActionData<ActionDataType>();
  const { project } = useProject();
  const { user } = useUser();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();
  const { strategies, variants, segments } = useLoaderData<LoaderData>();
  const navigation = useNavigation();

  const type = navigation?.formData?.get("_type");
  const isCreatingStrategy = type === "add-strategy";

  return (
    <DashboardLayout
      user={user}
      subNav={
        <FlagEnvMenu
          projectId={project.uuid}
          envId={environment.uuid}
          flagEnv={flagEnv}
        />
      }
      status={
        actionData?.successStrategyEdited ? (
          <SuccessBox id={"strategy-edited"}>
            The strategy has been successfully edited.
          </SuccessBox>
        ) : actionData?.successStrategyDeleted ? (
          <SuccessBox id="strategy-deleted">
            The strategy has been removed.
          </SuccessBox>
        ) : actionData?.errors ? (
          <ErrorBox list={actionData.errors} />
        ) : actionData?.ruleErrors ? (
          <ErrorBox list={actionData.ruleErrors} />
        ) : null
      }
    >
      <PageTitle
        value="Audience"
        description={
          <Typography>
            Configure strategies and customize rules to better target your
            <br />
            audience.
          </Typography>
        }
        action={
          strategies.length > 0 && (
            <Form method="post">
              <input type="hidden" name="_type" value="add-strategy" />
              <CreateButton
                type="submit"
                variant={"secondary"}
                isLoading={isCreatingStrategy}
                loadingText="Adding a new strategy..."
              >
                Add a strategy
              </CreateButton>
            </Form>
          )
        }
      />

      <Section id="rollout-target">
        {strategies.length > 0 ? (
          <StrategyList
            items={strategies}
            variants={variants}
            segments={segments}
          />
        ) : (
          <Card>
            <CardContent>
              <EmptyState
                title="No strategies found"
                description={`The persons requesting your flag will simply resolve "true" or "false" depending on the flag status toggle.`}
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
            </CardContent>
          </Card>
        )}
      </Section>
    </DashboardLayout>
  );
}
