import { useState, useTransition } from "react";

import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import { Flag, FlagEnv } from "~/modules/flags/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { StrategyRuleType } from "~/modules/strategies/types/StrategyRule";
import { getSession } from "~/sessions";
import { validateStrategyForm } from "~/modules/strategies/validators/validateStrategyForm";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import {
  StrategyCreateDTO,
  StrategyRetrieveDTO,
} from "~/modules/strategies/types";
import { editStrategy } from "~/modules/strategies/services/editStrategy";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { StrategyAudience } from "~/modules/strategies/components/StrategyAudience";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { User } from "~/modules/user/types";
import { Header } from "~/components/Header";
import { Environment } from "~/modules/environments/types";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { Crumbs } from "~/components/Breadcrumbs/types";
import {
  MetaFunction,
  ActionFunction,
  redirect,
  LoaderFunction,
} from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
import { Card, CardContent } from "~/components/Card";
import { Section } from "~/components/Section";
import { styled } from "~/stitches.config";
import { Spacer } from "~/components/Spacer";
import { getStrategy } from "~/modules/strategies/services/getStrategy";

const CardGroup = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$spacing$8",

  "@tablet": {
    gridTemplateColumns: "1fr",
  },
});

const Row = styled("div", {
  display: "flex",
  flexDirection: "column-reverse",
  gap: "$spacing$4",
});

const AlignActions = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
});

interface MetaArgs {
  data?: {
    project?: Project;
    environment?: Environment;
    currentFlag?: Flag;
    strategy?: StrategyRetrieveDTO;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const projectName = data?.project?.name || "An error ocurred";
  const envName = data?.environment?.name || "An error ocurred";
  const flagName = data?.currentFlag?.name || "An error ocurred";
  const strategyName = data?.strategy?.name || "An error ocurred";

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

  const percentageValue = formData.get("percentage-value") || undefined;

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

interface LoaderData {
  project: Project;
  environment: Environment;
  currentFlag: Flag;
  user: User;
  strategy: StrategyRetrieveDTO;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const project: Project = await getProject(params.id!, authCookie);

  const flagsByEnv: Array<FlagEnv> = await getFlagsByProjectEnv(
    params.env!,
    authCookie
  );

  const environment = project.environments.find(
    (env) => env.uuid === params.env
  );

  const currentFlag = flagsByEnv.find(
    (flagEnv) => flagEnv.flagId === params.flagId!
  )!.flag;

  const strategy: StrategyRetrieveDTO = await getStrategy(
    params.stratId!,
    authCookie
  );

  return {
    project,
    environment: environment!,
    currentFlag,
    user,
    strategy,
  };
};

export default function StrategyEditPage() {
  const transition = useTransition();
  const { project, environment, currentFlag, user, strategy } =
    useLoaderData<LoaderData>();

  const actionData = useActionData<ActionData>();

  const [strategyType, setStrategyType] = useState<StrategyRuleType>(
    strategy.strategyRuleType
  );

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
        <Row>
          <div>
            <CardGroup>
              <Card>
                <CardContent>
                  <Section id="general-information">
                    <Typography as="h2" font="title" size="earth">
                      General information
                    </Typography>

                    <Spacer size={4} />

                    <TextInput
                      name="strategy-name"
                      placeholder="e.g: Strategy 1"
                      label="Strategy name"
                      defaultValue={strategy.name}
                      isInvalid={Boolean(errors["strategy-name"])}
                    />
                  </Section>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Section>
                    <Typography as="h2" font="title" size="earth">
                      Targeting criteria
                    </Typography>

                    <Spacer size={4} />

                    <StrategyAudience
                      strategyType={strategyType}
                      onStrategyChange={setStrategyType}
                      errors={errors}
                      initialFieldName={strategy.fieldName}
                      initialFieldValue={strategy.fieldValue}
                      initialFieldComparator={strategy.fieldComparator}
                    />
                  </Section>
                </CardContent>
              </Card>
            </CardGroup>
          </div>

          <AlignActions aria-hidden>
            <SubmitButton
              tabIndex={-1}
              isLoading={transition.state === "submitting"}
              loadingText="Saving the strategy, please wait..."
            >
              Save the strategy
            </SubmitButton>
          </AlignActions>
        </Row>

        <Spacer size={4} />

        <AlignActions>
          <SubmitButton
            isLoading={transition.state === "submitting"}
            loadingText="Saving the strategy, please wait..."
          >
            Save the strategy
          </SubmitButton>
        </AlignActions>
      </Form>
    </DashboardLayout>
  );
}
