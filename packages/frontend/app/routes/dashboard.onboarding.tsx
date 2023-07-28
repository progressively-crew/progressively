import { ActionFunction, V2_MetaFunction, redirect } from "@remix-run/node";
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
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";
import { useUser } from "~/modules/user/contexts/useUser";

export const meta: V2_MetaFunction = () => {
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
    <NotAuthenticatedLayout status={errors?.name && <ErrorBox list={errors} />}>
      <Stack spacing={4}>
        <h1
          className="text-4xl md:text-5xl motion-safe:animate-fade-enter-bottom"
          id="page-title"
        >
          <span className="dark:text-slate-100">Welcome aboard</span>
          <Spacer size={2} />
          <Typography as="span" className="font-extrabold">
            {user.fullname}
          </Typography>
        </h1>
        <Spacer size={2} />
        <Typography
          className="motion-safe:opacity-0 motion-safe:animate-fade-enter-bottom"
          style={{ animationDelay: "500ms" }}
        >
          Before being fully operational, you will need to create{" "}
          <strong>a project</strong>. In general, a project is the name of your
          application.
        </Typography>

        <div
          className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
          style={{
            animationDelay: "700ms",
          }}
        >
          <Form method="post">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <TextInput
                  isInvalid={Boolean(errors?.name)}
                  label="Project name"
                  name="name"
                  placeholder="e.g: My super project"
                  hiddenLabel
                />
              </div>

              <SubmitButton
                loadingText="Creating the project..."
                isLoading={navigation.state === "loading"}
              >
                Create the project
              </SubmitButton>
            </div>
          </Form>
        </div>
      </Stack>
    </NotAuthenticatedLayout>
  );
}
