import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { UserRoles } from "~/modules/projects/types";
import { getSession } from "~/sessions";
import { User } from "~/modules/user/types";
import { ButtonCopy } from "~/components/ButtonCopy";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";
import { Li, Ul } from "~/components/Ul";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ActionFunction, MetaFunction } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { DialogCloseBtn } from "~/components/Dialog/Dialog";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";
import { editProject } from "~/modules/projects/services/editProject";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Edit`,
    },
  ];
};

interface ActionData {
  errors?: Partial<{ name: string; domain: string; backendError: string }>;
  success?: boolean;
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const domain = formData.get("domain")?.toString();
  const errors: ActionData["errors"] = {};

  if (!name) {
    errors.name = "Invalid name";
  }

  if (!domain) {
    errors.domain = "Invalid domain";
  }

  const hasError = Object.keys(errors).length > 0;
  if (hasError) return { errors };

  const session = await getSession(request.headers.get("Cookie"));

  try {
    await editProject(params.id!, name!, domain!, session.get("auth-cookie"));

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

export default function EditProjectPage() {
  const data = useActionData<ActionData>();
  const navigation = useNavigation();
  const { project, userRole } = useProject();

  const adminOfProject = (project?.userProject || [])
    ?.filter((up) => up.role === UserRoles.Admin)
    .map((up) => up.user) as Array<User>;

  const errors = data?.errors;

  if (userRole !== UserRoles.Admin) {
    return (
      <CreateEntityLayout
        titleSlot={
          <CreateEntityTitle>
            You are not allowed to edit the project.
          </CreateEntityTitle>
        }
      >
        <figure>
          <Typography as="figcaption">
            If you think this is an error, make sure to contact one of the
            project administrators:
          </Typography>

          <Ul>
            {adminOfProject.map((user) => (
              <Li key={user.uuid}>
                <Typography>{user.fullname}</Typography>

                <ButtonCopy toCopy={user.email}>{user.email}</ButtonCopy>
              </Li>
            ))}
          </Ul>
        </figure>
      </CreateEntityLayout>
    );
  }

  const errorsToDisplay = errors || {};
  const hasError = Object.keys(errorsToDisplay).length > 0;

  return (
    <Form method="post" className="flex flex-col flex-1">
      <CreateEntityLayout
        status={
          data?.success ? (
            <SuccessBox id="project-updated">
              The project has been updated.
            </SuccessBox>
          ) : hasError ? (
            <ErrorBox list={errorsToDisplay} />
          ) : null
        }
        titleSlot={<CreateEntityTitle>Edit the project</CreateEntityTitle>}
        submitSlot={
          <SubmitButton
            isLoading={navigation.state === "submitting"}
            loadingText="Adding the member, please wait..."
          >
            Edit
          </SubmitButton>
        }
        closeSlot={
          <DialogCloseBtn
            to={`/dashboard/projects/${project.uuid}/settings`}
            label={`Back to ${project.name}`}
          />
        }
      >
        <TextInput
          isInvalid={Boolean(errors?.name)}
          name="name"
          label="Project name"
          placeholder="e.g: john.doe@gmail.com"
          defaultValue={project.name}
        />

        <TextInput
          isInvalid={Boolean(errors?.name)}
          name="domain"
          label="Project domain"
          description="This is used in combination to the client key for security reasons."
          placeholder="e.g: prod.com/**"
          defaultValue={project.domain}
        />
      </CreateEntityLayout>
    </Form>
  );
}
