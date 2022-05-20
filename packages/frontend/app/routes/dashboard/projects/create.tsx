import {
  Form,
  useActionData,
  ActionFunction,
  redirect,
  MetaFunction,
  LoaderFunction,
  useLoaderData,
  useTransition,
} from "remix";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { ErrorBox } from "~/components/ErrorBox";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { createProject } from "~/modules/projects/services/createProject";
import { CreateProjectDTO, UserProject } from "~/modules/projects/types";
import { validateProjectName } from "~/modules/projects/validators/validateProjectName";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { User } from "~/modules/user/types";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { Button } from "~/components/Button";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";

export const meta: MetaFunction = () => {
  return {
    title: "Progressively | Create a project",
  };
};

interface LoaderData {
  user: User;
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const user = await authGuard(request);
  return { user };
};

interface ActionData {
  errors: Partial<CreateProjectDTO>;
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response> => {
  const formData = await request.formData();
  const projectName = formData.get("name")?.toString();

  const errors = validateProjectName({ name: projectName });

  if (errors?.name) {
    return { errors };
  }

  const session = await getSession(request.headers.get("Cookie"));

  const userProject: UserProject = await createProject(
    projectName!,
    session.get("auth-cookie")
  );

  return redirect(
    `/dashboard?newProjectId=${userProject.projectId}#project-added`
  );
};

export default function CreateProjectPage() {
  const data = useActionData<ActionData>();
  const transition = useTransition();
  const { user } = useLoaderData<LoaderData>();
  const errors = data?.errors;

  const crumbs: Crumbs = [
    {
      link: "/dashboard",
      label: "Projects",
    },
    {
      link: "/dashboard/projects/create",
      label: "Create a project",
    },
  ];

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          title="Create a project"
          description={
            <Typography fontSize="xl" color="textlight">
              When creating a project, {`you'll`} become the administrator of it
              and will have full control over it.
            </Typography>
          }
        />
      }
    >
      <Section>
        {errors?.name && <ErrorBox list={errors} />}

        <Form method="post">
          <TextInput
            isInvalid={Boolean(errors?.name)}
            label="Project name"
            name="name"
            placeholder="e.g: My super project"
          />

          <Button
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Creating the project, please wait..."
          >
            Create the project
          </Button>
        </Form>
      </Section>
    </DashboardLayout>
  );
}
