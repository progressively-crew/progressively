import {
  MetaFunction,
  LoaderFunction,
  ActionFunction,
  redirect,
} from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  Form,
  useTransition,
} from "@remix-run/react";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { Typography } from "~/components/Typography";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { Environment } from "~/modules/environments/types";
import { createFlag } from "~/modules/flags/services/createFlag";
import { CreateFlagDTO, Flag } from "~/modules/flags/types";
import { validateFlagShape } from "~/modules/flags/validators/validateFlagShape";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
import { Checkbox } from "~/components/Checkbox";
import { Label } from "~/components/Fields/Label";
import { HStack } from "~/components/HStack";
import { Stack } from "~/components/Stack";
import { Divider } from "~/components/Divider";

interface MetaArgs {
  data?: {
    project?: Project;
    environment?: Environment;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const projectName = data?.project?.name || "An error ocurred";
  const envName = data?.environment?.name || "An error ocurred";

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | Create`,
  };
};

interface LoaderData {
  project: Project;
  user: User;
  environment: Environment;
  environments: Array<Environment>;
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

  return {
    project,
    environment: environment!,
    user,
    environments: project.environments,
  };
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
  const environments = formData.getAll("otherEnvironments");
  const description = formData.get("flag-desc")?.toString();

  const errors = validateFlagShape({ name, description });

  if (errors?.name || errors?.description) {
    return { errors };
  }

  const session = await getSession(request.headers.get("Cookie"));

  try {
    const newFlag: Flag = await createFlag(
      envId,
      name!,
      description!,
      environments,
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

  const { project, environment, user, environments } =
    useLoaderData<LoaderData>();

  const errors = data?.errors;

  const crumbs: Crumbs = [
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
            <Typography>
              The new feature flag will appear in{" "}
              <strong>{project.name}</strong> /{" "}
              <strong>{environment.name}</strong>. After the creation of a
              feature flag, you will be able to get its SDK key for application
              usage.
            </Typography>
          }
        />
      }
      status={
        (errors?.name || errors?.description) && <ErrorBox list={errors} />
      }
    >
      <Section>
        <Form method="post">
          <FormGroup>
            <TextInput
              name="flag-name"
              isInvalid={Boolean(errors?.name)}
              label="Flag name"
              placeholder="e.g: New Homepage"
            />

            <div>
              <TextInput
                name="flag-desc"
                isInvalid={Boolean(errors?.description)}
                label="Flag description"
                placeholder="e.g: The new homepage"
              />
            </div>

            <Divider background="apollo" />

            <fieldset>
              <Stack spacing={2}>
                <Label as="legend">
                  Create this flag for the following environments
                </Label>
                {environments.map((env) => (
                  <HStack spacing={2} key={env.uuid}>
                    <Checkbox
                      id={env.uuid}
                      value={env.uuid}
                      name="otherEnvironments"
                      defaultChecked={true}
                    />
                    <Label size="uranus" htmlFor={env.uuid} fontWeight="normal">
                      {env.name}
                    </Label>
                  </HStack>
                ))}
              </Stack>
            </fieldset>

            <div>
              <SubmitButton
                type="submit"
                isLoading={transition.state === "submitting"}
                loadingText="Creating the feature flag, please wait..."
              >
                Create the feature flag
              </SubmitButton>
            </div>
          </FormGroup>
        </Form>
      </Section>
    </DashboardLayout>
  );
}
