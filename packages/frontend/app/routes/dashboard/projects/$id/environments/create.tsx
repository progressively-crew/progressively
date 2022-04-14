import { Box, FormControl, Input, Text } from "@chakra-ui/react";
import { IoIosCreate } from "react-icons/io";
import {
  Form,
  useActionData,
  ActionFunction,
  LoaderFunction,
  useLoaderData,
  MetaFunction,
  redirect,
  useTransition,
} from "remix";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { ErrorBox } from "~/components/ErrorBox";
import { authGuard } from "~/modules/auth/auth-guard";
import { createEnv } from "~/modules/environments/createEnv";
import {
  CreateEnvironmentDTO,
  Environment,
} from "~/modules/environments/types";
import { validateEnvName } from "~/modules/environments/validateEnvName";
import { getProject } from "~/modules/projects/getProject";
import { Project } from "~/modules/projects/types";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { User } from "~/modules/user/types";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { Button } from "~/components/Button";
import { FormLabel } from "~/components/FormLabel";

interface MetaArgs {
  data: {
    project: Project;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const { project } = data;

  return {
    title: `Rollout | ${project.name} | Create an environment`,
  };
};

interface LoaderData {
  user: User;
  project: Project;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);
  const session = await getSession(request.headers.get("Cookie"));
  const project = await getProject(params.id!, session.get("auth-cookie"));

  return { project, user };
};

interface ActionData {
  errors?: Partial<CreateEnvironmentDTO>;
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const projectId = params.id!;
  const formData = await request.formData();
  const projectName = formData.get("env-name")?.toString();

  const errors = validateEnvName({ name: projectName });

  if (errors?.name) {
    return { errors };
  }

  const session = await getSession(request.headers.get("Cookie"));

  const env: Environment = await createEnv(
    projectId,
    projectName!,
    session.get("auth-cookie")
  );

  return redirect(
    `/dashboard/projects/${projectId}?newEnvId=${env.uuid}#env-added`
  );
};

export default function CreateEnvironmentPage() {
  const transition = useTransition();
  const data = useActionData<ActionData>();
  const { project, user } = useLoaderData<LoaderData>();
  const errors = data?.errors;

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
      link: `/dashboard/projects/${project.uuid}/environments/create`,
      label: "Create an environment",
    },
  ];

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          title="Create an environment"
          description={
            <Text>
              The new environment will appear in <strong>{project.name}</strong>
              .
            </Text>
          }
        />
      }
    >
      <Section>
        <Box p={[4, 0]}>
          {errors?.name && (
            <Box pb={4}>
              <ErrorBox list={errors} />
            </Box>
          )}

          <Form method="post">
            <FormControl isInvalid={Boolean(errors?.name)}>
              <FormLabel htmlFor="env-name">Environment name</FormLabel>
              <Input
                type="text"
                name="env-name"
                id="env-name"
                placeholder="e.g: Staging"
                aria-describedby={
                  data?.errors?.name
                    ? "error-name env-name-hint"
                    : "env-name-hint"
                }
              />
            </FormControl>

            <Text id="env-name-hint" fontSize="sm">
              After the creation of an environment, you will be able to get its
              SDK key for application usage.
            </Text>

            <Box mt={4}>
              <Button
                type="submit"
                leftIcon={<IoIosCreate aria-hidden />}
                colorScheme="brand"
                isLoading={transition.state === "submitting"}
                loadingText="Creating the environment, please wait..."
                disabled={false}
              >
                Create the environment
              </Button>
            </Box>
          </Form>
        </Box>
      </Section>
    </DashboardLayout>
  );
}
