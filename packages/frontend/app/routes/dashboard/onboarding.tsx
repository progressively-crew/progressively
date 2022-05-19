import { IoIosCreate } from "react-icons/io";
import {
  Form,
  useActionData,
  ActionFunction,
  redirect,
  LoaderFunction,
  useLoaderData,
} from "remix";
import { Button } from "~/components/Button";
import { ErrorBox } from "~/components/ErrorBox";
import { TextInput } from "~/components/Fields/TextInput";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { Typography } from "~/components/Typography";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { createProject } from "~/modules/projects/services/createProject";
import { CreateProjectDTO, UserProject } from "~/modules/projects/types";
import { validateProjectName } from "~/modules/projects/validators/validateProjectName";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
import { DashboardLayout } from "../../layouts/DashboardLayout";

export const meta = () => {
  return {
    title: "Progressively | Onboarding",
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

export default function OnboardingPage() {
  const { user } = useLoaderData<LoaderData>();
  const data = useActionData<ActionData>();

  const errors = data?.errors;

  return (
    <DashboardLayout
      user={user}
      header={
        <Header
          title="Welcome aboard"
          description={
            <Typography>
              Before being fully operational, you will need to create{" "}
              <strong>a project</strong>.
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
            leftIcon={<IoIosCreate aria-hidden />}
            colorScheme="brand"
          >
            Create the project
          </Button>
        </Form>
      </Section>
    </DashboardLayout>
  );
}
