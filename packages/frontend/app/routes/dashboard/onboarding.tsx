import { ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";
import { createProject } from "~/modules/projects/services/createProject";
import { CreateProjectDTO, UserProject } from "~/modules/projects/types";
import { validateProjectName } from "~/modules/projects/validators/validateProjectName";
import { getSession } from "~/sessions";
import { PageTitle } from "~/components/PageTitle";
import { Card, CardContent } from "~/components/Card";
import { FadeInSlide } from "~/components/animations/FadeInSlide";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";

export const meta = () => {
  return {
    title: "Progressively | Onboarding",
  };
};

interface ActionData {
  errors: Partial<CreateProjectDTO>;
}

export const action: ActionFunction = async ({ request }): Promise<ActionData | Response> => {
  const formData = await request.formData();
  const projectName = formData.get("name")?.toString();

  const errors = validateProjectName({ name: projectName });

  if (errors?.name) {
    return { errors };
  }

  const session = await getSession(request.headers.get("Cookie"));

  const userProject: UserProject = await createProject(projectName!, session.get("auth-cookie"));

  return redirect(`/dashboard?newProjectId=${userProject.projectId}#project-added`);
};

export default function OnboardingPage() {
  const data = useActionData<ActionData>();

  const errors = data?.errors;

  return (
    <NotAuthenticatedLayout
      header={
        <FadeInSlide>
          <PageTitle
            value="Welcome aboard"
            description={
              <Typography>
                Before being fully operational, you will need to create <strong>a project</strong>.
              </Typography>
            }
          />
        </FadeInSlide>
      }
      status={errors?.name && <ErrorBox list={errors} />}
    >
      <FadeInSlide>
        <Card>
          <CardContent>
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
          </CardContent>
        </Card>
      </FadeInSlide>
    </NotAuthenticatedLayout>
  );
}
