import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  transition,
  Stack,
} from "@chakra-ui/react";
import { Environment } from "prismjs";
import { useState } from "react";
import { IoIosCreate } from "react-icons/io";
import { Form, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { BreadCrumbs, Crumbs } from "~/components/AppBreadcrumbs";
import { ErrorBox } from "~/components/ErrorBox";
import { Header } from "~/components/Header";
import { Main } from "~/components/Main";
import { Section, SectionHeader } from "~/components/Section";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/auth-guard";
import { getFlagsByProjectEnv } from "~/modules/flags/getFlagsByProjectEnv";
import { Flag, FlagEnv } from "~/modules/flags/types";
import { getProject } from "~/modules/projects/getProject";
import { Project } from "~/modules/projects/types";
import { ActivationStrategy } from "~/modules/strategies/components/ActivationStrategy";
import { StrategyAudience } from "~/modules/strategies/components/StrategyAudience";
import { getStrategy } from "~/modules/strategies/getStrategy";
import { StrategyRetrieveDTO } from "~/modules/strategies/types";
import { ActivationType } from "~/modules/strategies/types/activation";
import { StrategyRuleType } from "~/modules/strategies/types/StrategyRule";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";

interface MetaArgs {
  data: {
    project: Project;
    environment: Environment;
    currentFlag: Flag;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const project = data.project;
  const environment = data.environment;
  const currentFlag = data.currentFlag;

  return {
    title: `Rollout | ${project.name} | ${environment.name} | Flags | ${currentFlag.name} | Strategies | Edit`,
  };
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

  const strategy: StrategyRetrieveDTO = await getStrategy(
    params.id!,
    params.env!,
    params.flagId!,
    params.stratId!,
    authCookie
  );
  const project: Project = await getProject(params.id!, authCookie);

  const flagsByEnv: Array<FlagEnv> = await getFlagsByProjectEnv(
    params.id!,
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
    strategy,
  };
};

export default function EditStrat() {
  const { project, environment, currentFlag, user, strategy } =
    useLoaderData<LoaderData>();

  const [strategyType, setStrategyType] = useState<StrategyRuleType>(
    strategy.strategyRuleType
  );
  const [activationStrategy, setActivationStrategy] = useState<ActivationType>(
    strategy.activationType || "boolean"
  );

  const actionData = { errors: undefined };
  const errors = (actionData?.errors || {}) as any;

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
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/1/edit`,
      label: "Edit a strategy",
    },
  ];

  return (
    <DashboardLayout user={user}>
      <BreadCrumbs crumbs={crumbs} />
      <Main>
        <Box pb={8}>
          <Header title="Edit a strategy" />
        </Box>

        <Form method="post">
          {actionData?.errors && (
            <Box pb={4}>
              <ErrorBox list={actionData.errors} />
            </Box>
          )}

          <Stack spacing={4}>
            <Section id="general-information">
              <SectionHeader title="General information" />

              <Box px={4} pb={4}>
                <FormControl isInvalid={Boolean(errors["strategy-name"])}>
                  <FormLabel htmlFor="strategy-name">Strategy name</FormLabel>
                  <Input
                    type="text"
                    defaultValue={strategy.name}
                    placeholder="e.g: Strategy 1"
                    id="strategy-name"
                    name="strategy-name"
                    aria-describedby={
                      errors["strategy-name"]
                        ? "error-strategy-name"
                        : undefined
                    }
                  />
                </FormControl>
              </Box>
            </Section>

            <StrategyAudience
              strategyType={strategyType}
              onStrategyChange={setStrategyType}
              errors={errors}
              initialFieldName={strategy.fieldName}
              initialFieldValue={strategy.fieldValue?.split(",").join("\n")}
              initialFieldComparator={strategy.fieldComparator}
            />

            <ActivationStrategy
              activationStrategy={activationStrategy}
              onActivationChange={setActivationStrategy}
              errors={errors}
            />

            <Flex justifyContent={"flex-end"} mt={8}>
              <Button
                colorScheme={"brand"}
                type="submit"
                leftIcon={<IoIosCreate aria-hidden />}
                isLoading={transition.state === "submitting"}
                loadingText="Saving the strategy, please wait..."
                disabled={false}
              >
                Save the strategy
              </Button>
            </Flex>
          </Stack>
        </Form>
      </Main>
    </DashboardLayout>
  );
}
