import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { createProject } from "~/modules/projects/services/createProject";
import { CreateProjectDTO, Project } from "~/modules/projects/types";
import { validateProjectName } from "~/modules/projects/validators/validateProjectName";
import { getSession } from "~/sessions";
import { TextInput } from "~/components/Fields/TextInput";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ActionFunction, redirect, MetaFunction } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";
import { DialogCloseBtn } from "~/components/Dialog/Dialog";
import { FormGroup } from "~/components/Fields/FormGroup";

export const meta: MetaFunction = () => {
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
  const domain = formData.get("domain")?.toString();
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const errors = validateProjectName({
    name: projectName || "",
    domain: domain || "",
  });

  if (errors?.name) {
    return { errors };
  }

  const session = await getSession(request.headers.get("Cookie"));

  const userProject: Project = await createProject(
    projectName!,
    domain!,
    session.get("auth-cookie")
  );

  return redirect(
    `/dashboard/projects/${userProject.uuid}/flags/all?projectCreated=true#project-added`
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
        closeSlot={
          <DialogCloseBtn
            to={`/dashboard/projects/all`}
            label={`Back to projects`}
          />
        }
      >
        <FormGroup>
          <TextInput
            isInvalid={Boolean(errors?.name)}
            label="Project name"
            name="name"
            placeholder="e.g: My super project"
          />

          <TextInput
            isInvalid={Boolean(errors?.domain)}
            label="Domain"
            name="domain"
            placeholder="e.g: mfrachet.com"
          />
        </FormGroup>
      </CreateEntityLayout>
    </Form>
  );
}
