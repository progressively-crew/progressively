import { useState, useTransition } from "react";

import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import { Flag, FlagEnv } from "~/modules/flags/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { StrategyRuleType } from "~/modules/strategies/types/StrategyRule";
import { getSession } from "~/sessions";
import { validateStrategyForm } from "~/modules/strategies/validators/validateStrategyForm";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { StrategyCreateDTO } from "~/modules/strategies/types";
import { createStrategy } from "~/modules/strategies/services/createStrategy";
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
import { Stack } from "~/components/Stack";
import { RadioField } from "~/components/Fields/RadioField";
import { SliderInput } from "~/components/Fields/SliderInput";
import { Divider } from "~/components/Divider";
import { Section } from "~/components/Section";
import { styled } from "~/stitches.config";
import { Spacer } from "~/components/Spacer";

const CardGroup = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$spacing$8",

  "@tablet": {
    gridTemplateColumns: "1fr",
  },
});

interface MetaArgs {
  data?: {
    project?: Project;
    environment?: Environment;
    currentFlag?: Flag;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const projectName = data?.project?.name || "An error ocurred";
  const envName = data?.environment?.name || "An error ocurred";
  const flagName = data?.currentFlag?.name || "An error ocurred";

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

  const percentageValue = formData.get("percentage-value") || undefined;

  const strategy: StrategyCreateDTO = {
    name: strategyName,
    strategyRuleType: strategyType,
    fieldComparator: fieldComparator,
    fieldName,
    fieldValue,
    rolloutPercentage: Number(percentageValue),
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

  return {
    project,
    environment: environment!,
    currentFlag,
    user,
  };
};

export default function StrategyCreatePage() {
  const transition = useTransition();
  const [percentageValue, setPercentageValue] = useState<number>(100);

  const { project, environment, currentFlag, user } =
    useLoaderData<LoaderData>();

  const actionData = useActionData<ActionData>();

  const [strategyType, setStrategyType] = useState<StrategyRuleType>("default");

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
          title="Create a strategy"
          description={
            <Typography>
              {`You're`} about to create a strategy to{" "}
              <strong>{currentFlag.name}</strong> in{" "}
              <strong>{project.name}</strong> on{" "}
              <strong>{environment.name}</strong>.
            </Typography>
          }
        />
      }
      status={actionData?.errors && <ErrorBox list={actionData.errors} />}
    >
      <Form method="post">
        <CardGroup>
          <Card>
            <CardContent>
              <Section id="general-information">
                <Typography as="h2" font="title" size="earth">
                  General information
                </Typography>

                <Spacer size={4} />

                <Stack spacing={4}>
                  <TextInput
                    name="strategy-name"
                    placeholder="e.g: Strategy 1"
                    label="Strategy name"
                    isInvalid={Boolean(errors["strategy-name"])}
                  />

                  <Divider />

                  <SliderInput
                    name="percentage-value"
                    label={`Percentage of the audience concerned`}
                    onChange={setPercentageValue}
                    percentageValue={percentageValue}
                  />
                </Stack>
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
                />
              </Section>
            </CardContent>
          </Card>
        </CardGroup>

        <Spacer size={8} />

        <div>
          <SubmitButton
            isLoading={transition.state === "submitting"}
            loadingText="Saving the strategy, please wait..."
          >
            Save the strategy
          </SubmitButton>
        </div>
      </Form>
    </DashboardLayout>
  );
}
