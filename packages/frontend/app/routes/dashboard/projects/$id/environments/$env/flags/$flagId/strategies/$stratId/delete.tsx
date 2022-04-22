import { Box, Text, Flex, VisuallyHidden } from "@chakra-ui/react";
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
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { ErrorBox } from "~/components/ErrorBox";
import { FaTrash } from "react-icons/fa";
import { WarningBox } from "~/components/WarningBox";
import { authGuard } from "~/modules/auth/auth-guard";
import { Environment } from "~/modules/environments/types";
import { getProject } from "~/modules/projects/getProject";
import { Project } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { FlagEnv } from "~/modules/flags/types";
import { getFlagsByProjectEnv } from "~/modules/flags/getFlagsByProjectEnv";
import { getStrategy } from "~/modules/strategies/getStrategy";
import { StrategyRetrieveDTO } from "~/modules/strategies/types";
import { deleteStrategy } from "~/modules/strategies/deleteStrategy";
import { Button } from "~/components/Button";

interface MetaArgs {
  data: {
    project: Project;
    environment: Environment;
    currentFlagEnv: FlagEnv;
    strategy: StrategyRetrieveDTO;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const project = data.project;
  const environment = data.environment;
  const currentFlagEnv = data.currentFlagEnv;
  const strategy = data.strategy;
  const { flag } = currentFlagEnv;

  return {
    title: `Progressively | ${project.name} | ${environment.name} | ${flag.name} | ${strategy.name} | Delete`,
  };
};

interface LoaderData {
  project: Project;
  environment: Environment;
  user: User;
  currentFlagEnv: FlagEnv;
  strategy: StrategyRetrieveDTO;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const project: Project = await getProject(
    params.id!,
    session.get("auth-cookie"),
    true
  );

  const flagsByEnv: Array<FlagEnv> = await getFlagsByProjectEnv(
    params.id!,
    params.env!,
    authCookie
  );

  const environment = project.environments.find(
    (env) => env.uuid === params.env
  );

  const currentFlagEnv = flagsByEnv.find(
    (flagEnv) => flagEnv.flagId === params.flagId!
  )!;

  const strategy: StrategyRetrieveDTO = await getStrategy(
    params.id!,
    params.env!,
    params.flagId!,
    params.stratId!,
    authCookie
  );

  return {
    project,
    environment: environment!,
    user,
    currentFlagEnv,
    strategy,
  };
};

interface ActionData {
  errors?: {
    backendError?: string;
  };
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const session = await getSession(request.headers.get("Cookie"));
  const projectId = params.id!;
  const envId = params.env!;
  const flagId = params.flagId!;
  const stratId = params.stratId!;

  try {
    await deleteStrategy(
      projectId,
      envId,
      flagId,
      stratId,
      session.get("auth-cookie")
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: { backendError: e.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(
    `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}?stratRemoved=true#strat-removed`
  );
};

export default function DeleteStrategyPage() {
  const transition = useTransition();

  const { project, environment, user, currentFlagEnv, strategy } =
    useLoaderData<LoaderData>();
  const data = useActionData<ActionData>();

  const currentFlag = currentFlagEnv.flag;

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
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/1/delete`,
      label: "Delete a strategy",
    },
  ];

  const warnings = {
    "turned-off":
      "The feature flag will not take this strategy into consideration when being evaluated.",
  };

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          title={`You are about to delete the strategy ${strategy.name}.`}
        />
      }
    >
      <Section>
        <Box p={[4, 0]}>
          {data?.errors && data.errors.backendError && (
            <Box pb={4}>
              <ErrorBox list={data.errors} />
            </Box>
          )}

          <WarningBox
            list={warnings}
            title={
              <Text>
                We really want to warn you: if you validate the strategy
                suppression, you {`won't`} be able to access the{" "}
                <strong>{strategy.name}</strong> strategy anymore. It includes:
              </Text>
            }
          />

          <Flex
            justifyContent="space-between"
            mt={4}
            direction={["column", "column", "row"]}
          >
            <Button
              to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`}
              variant="outline"
              colorScheme="error"
            >
              <span>
                No, {`don't`} delete{" "}
                <Box as="strong" display={["none", "inline"]} aria-hidden>
                  {strategy.name}
                </Box>
                <VisuallyHidden>{strategy.name}</VisuallyHidden>
              </span>
            </Button>

            <Form method="post">
              <Button
                type="submit"
                colorScheme="error"
                leftIcon={<FaTrash aria-hidden />}
                isLoading={transition.state === "submitting"}
                loadingText="Deleting the environment, please wait..."
                disabled={false}
                mt={[4, 4, 0]}
                width={["100%", "100%", "auto"]}
              >
                Yes, delete the strategy
              </Button>
            </Form>
          </Flex>
        </Box>
      </Section>
    </DashboardLayout>
  );
}
