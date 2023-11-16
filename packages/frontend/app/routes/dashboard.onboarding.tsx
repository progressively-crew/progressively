import { ActionFunction, MetaFunction, redirect } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";
import { createProject } from "~/modules/projects/services/createProject";
import { CreateProjectDTO, Project } from "~/modules/projects/types";
import { validateProjectName } from "~/modules/projects/validators/validateProjectName";
import { getSession } from "~/sessions";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import { useUser } from "~/modules/user/contexts/useUser";
import { Logo } from "~/components/Logo/Logo";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Progressively | Onboarding",
    },
  ];
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

  const project: Project = await createProject(
    projectName!,
    session.get("auth-cookie")
  );

  return redirect(
    `/dashboard/projects/${project.uuid}/flags?projectCreated=true#project-added`
  );
};

export default function OnboardingPage() {
  const data = useActionData<ActionData>();
  const { user } = useUser();
  const navigation = useNavigation();

  const errors = data?.errors;

  return (
    <NotAuthenticatedLayout
      status={errors?.name && <ErrorBox list={errors} />}
      aside={<div />}
    >
      <Logo size={60} fill="black" />

      <Typography
        as="h1"
        className="text-5xl pt-4 !leading-tight pb-2 motion-safe:animate-fade-enter-top"
      >
        Welcome aboard <strong>{user.fullname}</strong>
      </Typography>

      <Typography
        className="motion-safe:opacity-0 motion-safe:animate-fade-enter-bottom pb-4"
        style={{ animationDelay: "300ms" }}
      >
        Before being fully operational, you will need to create{" "}
        <strong>a project</strong>. In general, a project is the name of your
        application.
      </Typography>

      <div className="w-full">
        <Form method="post">
          <div className="flex flex-col gap-4">
            <div
              className="motion-safe:opacity-0 motion-safe:animate-fade-enter-bottom"
              style={{ animationDelay: "500ms" }}
            >
              <TextInput
                isInvalid={Boolean(errors?.name)}
                label="Project name"
                name="name"
                placeholder="e.g: My super project"
                hiddenLabel
              />
            </div>

            <div
              className="motion-safe:opacity-0 motion-safe:animate-fade-enter-bottom"
              style={{ animationDelay: "700ms" }}
            >
              <SubmitButton
                loadingText="Creating the project..."
                isLoading={navigation.state === "loading"}
              >
                Create the project
              </SubmitButton>
            </div>
          </div>
        </Form>
      </div>
    </NotAuthenticatedLayout>
  );
}
