import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { UserRoles } from "~/modules/projects/types";
import { getSession } from "~/sessions";
import { User } from "~/modules/user/types";
import { validateEmail } from "~/modules/forms/utils/validateEmail";
import { ButtonCopy } from "~/components/ButtonCopy";
import { addMemberToProject } from "~/modules/projects/services/addMemberToProject";
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

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Add member`,
    },
  ];
};

interface ActionData {
  errors?: Partial<{ email: string; backendError: string }>;
  success?: boolean;
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const formData = await request.formData();
  const memberEmail = formData.get("email")?.toString();
  const emailError = validateEmail(memberEmail);

  if (emailError) {
    return { errors: { email: emailError } };
  }

  const session = await getSession(request.headers.get("Cookie"));

  try {
    await addMemberToProject(
      params.id!,
      memberEmail!,
      session.get("auth-cookie")
    );

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

export default function CreateProjectPage() {
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
            You are not allowed to add members to projects.
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
            <SuccessBox id="member-added">
              The user has been invited invited to join the project.
            </SuccessBox>
          ) : hasError ? (
            <ErrorBox list={errorsToDisplay} />
          ) : null
        }
        titleSlot={<CreateEntityTitle>Add member</CreateEntityTitle>}
        submitSlot={
          <SubmitButton
            isLoading={navigation.state === "submitting"}
            loadingText="Adding the member, please wait..."
          >
            Add the member
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
          isInvalid={Boolean(errors?.email)}
          name="email"
          label="Member email"
          placeholder="e.g: john.doe@gmail.com"
        />
      </CreateEntityLayout>
    </Form>
  );
}
