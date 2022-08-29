import { ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { Typography } from "~/components/Typography";
import { createProject } from "~/modules/projects/services/createProject";
import { CreateProjectDTO, UserProject } from "~/modules/projects/types";
import { validateProjectName } from "~/modules/projects/validators/validateProjectName";
import { getSession } from "~/sessions";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { useUser } from "~/modules/user/contexts/useUser";

export const meta = () => {
  return {
    title: "Progressively | Onboarding",
  };
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
  const { user } = useUser();
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
      status={errors?.name && <ErrorBox list={errors} />}
    >
      <Section>
        <Form method="post">
          <FormGroup>
            <TextInput
              isInvalid={Boolean(errors?.name)}
              label="Project name"
              name="name"
              placeholder="e.g: My super project"
            />

            <div>
              <SubmitButton>Create the project</SubmitButton>
            </div>
          </FormGroup>
        </Form>
      </Section>
    </DashboardLayout>
  );
}
