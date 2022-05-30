import { useState } from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  MetaFunction,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import { Flag, FlagEnv } from "~/modules/flags/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { ActivationType } from "~/modules/strategies/types/activation";
import { StrategyRuleType } from "~/modules/strategies/types/StrategyRule";
import { getSession } from "~/sessions";
import { validateStrategyForm } from "~/modules/strategies/validators/validateStrategyForm";
import { ErrorBox } from "~/components/ErrorBox";
import { StrategyCreateDTO } from "~/modules/strategies/types";
import { createStrategy } from "~/modules/strategies/services/createStrategy";
import { BreadCrumbs, Crumbs } from "~/components/AppBreadcrumbs";
import { StrategyAudience } from "~/modules/strategies/components/StrategyAudience";
import { ActivationStrategy } from "~/modules/strategies/components/ActivationStrategy";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { User } from "~/modules/user/types";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { Button } from "~/components/Buttons/Button";
import { Environment } from "~/modules/environments/types";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";
import { Container } from "~/components/Container";

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

  const activationStrategy =
    (formData.get(
      "strategy-activation"
    ) as StrategyCreateDTO["activationType"]) || undefined;

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
    activationType: activationStrategy,
    fieldComparator: fieldComparator,
    fieldName,
    fieldValue,
    rolloutPercentage: percentageValue ? Number(percentageValue) : undefined,
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

  const { project, environment, currentFlag, user } =
    useLoaderData<LoaderData>();

  const actionData = useActionData<ActionData>();

  const [strategyType, setStrategyType] = useState<StrategyRuleType>("default");
  const [activationStrategy, setActivationStrategy] =
    useState<ActivationType>("boolean");

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
      label: "Add a strategy",
    },
  ];

  const errors = actionData?.errors || {};

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          title="Add a strategy"
          description={
            <Typography>
              {`You're`} about to add a strategy to{" "}
              <strong>{currentFlag.name}</strong> in{" "}
              <strong>{project.name}</strong> on{" "}
              <strong>{environment.name}</strong>.
            </Typography>
          }
        />
      }
    >
      <Form method="post">
        <Container>
          {actionData?.errors && <ErrorBox list={actionData.errors} />}

          <Section id="general-information">
            <SectionHeader title="General information" />

            <TextInput
              name="strategy-name"
              placeholder="e.g: Strategy 1"
              label="Strategy name"
              isInvalid={Boolean(errors["strategy-name"])}
            />
          </Section>

          <StrategyAudience
            strategyType={strategyType}
            onStrategyChange={setStrategyType}
            errors={errors}
          />

          <ActivationStrategy
            activationStrategy={activationStrategy}
            onActivationChange={setActivationStrategy}
            errors={errors}
          />

          <Button
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Saving the strategy, please wait..."
          >
            Save the strategy
          </Button>
        </Container>
      </Form>
    </DashboardLayout>
  );
}
