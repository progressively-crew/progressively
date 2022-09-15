import { BreadCrumbs } from "~/components/Breadcrumbs";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { createProject } from "~/modules/projects/services/createProject";
import { CreateProjectDTO, UserProject } from "~/modules/projects/types";
import { validateProjectName } from "~/modules/projects/validators/validateProjectName";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { Section } from "~/components/Section";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";
import { FormGroup } from "~/components/Fields/FormGroup";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { useUser } from "~/modules/user/contexts/useUser";
import { PageTitle } from "~/components/PageTitle";
import { Card, CardContent } from "~/components/Card";

export const meta: MetaFunction = () => {
  return {
    title: "Progressively | Create a project",
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

export default function CreateProjectPage() {
  const data = useActionData<ActionData>();
  const transition = useTransition();
  const { user } = useUser();
  const errors = data?.errors;

  const crumbs: Crumbs = [
    {
      link: "/dashboard",
      label: "Projects",
      isRoot: true,
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
        <PageTitle
          value="Create a project"
          description={
            <Typography>
              When creating a project, you will become its administrator and you will have full
              control over it.
            </Typography>
          }
        />
      }
      status={errors?.name && <ErrorBox list={errors} />}
    >
      <Card>
        <CardContent>
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
                  <SubmitButton
                    type="submit"
                    isLoading={transition.state === "submitting"}
                    loadingText="Creating the project, please wait..."
                  >
                    Create the project
                  </SubmitButton>
                </div>
              </FormGroup>
            </Form>
          </Section>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
