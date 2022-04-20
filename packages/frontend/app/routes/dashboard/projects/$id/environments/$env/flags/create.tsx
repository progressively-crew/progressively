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
import { Button } from "~/components/Button";
import { ErrorBox } from "~/components/ErrorBox";
import { FormLabel } from "~/components/FormLabel";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/auth-guard";
import { Environment } from "~/modules/environments/types";
import { createFlag } from "~/modules/flags/createFlag";
import { CreateFlagDTO, Flag } from "~/modules/flags/types";
import { validateFlagShape } from "~/modules/flags/validateFlagShape";
import { getProject } from "~/modules/projects/getProject";
import { Project } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";

interface MetaArgs {
  data: {
    project: Project;
    environment: Environment;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const project = data.project;
  const environment = data.environment;

  return {
    title: `Progressively | ${project.name} | ${environment.name} | Flags | Create`,
  };
};

interface LoaderData {
  project: Project;
  user: User;
  environment: Environment;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);

  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const project: Project = await getProject(params.id!, authCookie);
  const environment = project.environments.find(
    (env) => env.uuid === params.env
  );

  return { project, environment: environment!, user };
};

interface ActionData {
  errors?: Partial<CreateFlagDTO>;
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const projectId = params.id!;
  const envId = params.env!;
  const formData = await request.formData();
  const name = formData.get("flag-name")?.toString();
  const description = formData.get("flag-desc")?.toString();

  const errors = validateFlagShape({ name, description });

  if (errors?.name || errors?.description) {
    return { errors };
  }

  const session = await getSession(request.headers.get("Cookie"));

  try {
    const newFlag: Flag = await createFlag(
      projectId,
      envId,
      name!,
      description!,
      session.get("auth-cookie")
    );

    return redirect(
      `/dashboard/projects/${projectId}/environments/${envId}/flags?newFlagId=${newFlag.uuid}#flag-added`
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: { name: e.message } };
    }

    return { errors: { name: "An error ocurred" } };
  }
};

export default function CreateFlagPage() {
  const data = useActionData<ActionData>();
  const transition = useTransition();

  const { project, environment, user } = useLoaderData<LoaderData>();
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
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags`,
      label: environment.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/create`,
      label: "Create a feature flag",
    },
  ];

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          title="Create a feature flag"
          description={
            <Text>
              The new feature flag will appear in{" "}
              <strong>{project.name}</strong> /{" "}
              <strong>{environment.name}</strong>.
            </Text>
          }
        />
      }
    >
      <Section>
        <Box p={[4, 0]}>
          {(errors?.name || errors?.description) && (
            <Box pb={4}>
              <ErrorBox list={errors} />
            </Box>
          )}

          <Form method="post">
            <Box mb={4}>
              <FormControl isInvalid={Boolean(errors?.name)}>
                <FormLabel htmlFor="flag-name">Flag name</FormLabel>
                <Input
                  type="text"
                  name="flag-name"
                  id="flag-name"
                  placeholder="e.g: New Homepage"
                  aria-describedby={
                    data?.errors?.name ? "error-name" : undefined
                  }
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl isInvalid={Boolean(errors?.name)}>
                <FormLabel htmlFor="flag-desc">Flag description</FormLabel>
                <Input
                  type="text"
                  name="flag-desc"
                  id="flag-desc"
                  placeholder="e.g: The new homepage"
                  aria-describedby={
                    data?.errors?.name ? "error-name" : undefined
                  }
                />
              </FormControl>
            </Box>

            <Text fontSize="sm">
              After the creation of a feature flag, you will be able to get its
              SDK key for application usage.
            </Text>

            <Box mt={4}>
              <Button
                type="submit"
                leftIcon={<IoIosCreate aria-hidden />}
                colorScheme="brand"
                isLoading={transition.state === "submitting"}
                loadingText="Creating the feature flag, please wait..."
                disabled={false}
              >
                Create the feature flag
              </Button>
            </Box>
          </Form>
        </Box>
      </Section>
    </DashboardLayout>
  );
}
