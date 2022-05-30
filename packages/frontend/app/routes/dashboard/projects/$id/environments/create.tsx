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
import { authGuard } from "~/modules/auth/services/auth-guard";
import { createEnv } from "~/modules/environments/services/createEnv";
import {
  CreateEnvironmentDTO,
  Environment,
} from "~/modules/environments/types";
import { validateEnvName } from "~/modules/environments/validators/validateEnvName";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { User } from "~/modules/user/types";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";
import { FormGroup } from "~/components/Fields/FormGroup";
import { SubmitButton } from "~/components/Buttons/SubmitButton";

interface MetaArgs {
  data?: {
    project?: Project;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const title = data?.project?.name || "An error ocurred";

  return {
    title: `Progressively | ${title} | Create an environment`,
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
            <Typography>
              The new environment will appear in <strong>{project.name}</strong>
              .
            </Typography>
          }
        />
      }
      status={errors?.name && <ErrorBox list={errors} />}
    >
      <Section>
        <Form method="post">
          <FormGroup>
            <TextInput
              isInvalid={Boolean(errors?.name)}
              name="env-name"
              placeholder="e.g: Staging"
              label="Environment name"
              description="After the creation of an environment, you will be able to get
              its SDK key for application usage."
            />

            <SubmitButton
              type="submit"
              isLoading={transition.state === "submitting"}
              loadingText="Creating the environment, please wait..."
            >
              Create the environment
            </SubmitButton>
          </FormGroup>
        </Form>
      </Section>
    </DashboardLayout>
  );
}
