import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { createProject } from "~/modules/projects/services/createProject";
import { CreateProjectDTO, Project } from "~/modules/projects/types";
import { validateProjectName } from "~/modules/projects/validators/validateProjectName";
import { getSession } from "~/sessions";
import { TextInput } from "~/components/Fields/TextInput";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ActionFunction, redirect, V2_MetaFunction } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { BackLink } from "~/components/BackLink";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Progressively | Create a project",
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
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const errors = validateProjectName({ name: projectName });

  if (errors?.name) {
    return { errors };
  }

  const session = await getSession(request.headers.get("Cookie"));

  const userProject: Project = await createProject(
    projectName!,
    session.get("auth-cookie")
  );

  return redirect(
    `/dashboard/projects/${userProject.uuid}/flags?projectCreated=true#project-added`
  );
};

export default function CreateProjectPage() {
  const data = useActionData<ActionData>();
  const navigation = useNavigation();
  const errors = data?.errors;

  return (
    <Form method="post" className="flex flex-col flex-1">
      <CreateEntityLayout
        status={errors?.name && <ErrorBox list={errors} />}
        titleSlot={<CreateEntityTitle>Create a project</CreateEntityTitle>}
        submitSlot={
          <SubmitButton
            type="submit"
            isLoading={navigation.state === "submitting"}
            loadingText="Creating the project, please wait..."
          >
            Create the project
          </SubmitButton>
        }
        backLinkSlot={<BackLink to={`/dashboard`}>Back to projects</BackLink>}
      >
        <TextInput
          isInvalid={Boolean(errors?.name)}
          label="Project name"
          name="name"
          placeholder="e.g: My super project"
        />
      </CreateEntityLayout>
    </Form>
  );
}
