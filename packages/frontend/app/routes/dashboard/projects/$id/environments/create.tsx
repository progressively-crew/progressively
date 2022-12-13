import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { createEnv } from "~/modules/environments/services/createEnv";
import {
  CreateEnvironmentDTO,
  Environment,
} from "~/modules/environments/types";
import { validateEnvName } from "~/modules/environments/validators/validateEnvName";
import { getSession } from "~/sessions";
import { TextInput } from "~/components/Fields/TextInput";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { BackLink } from "~/components/BackLink";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";

export const meta: MetaFunction = ({ parentsData }) => {
  const projectName = getProjectMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | Create an environment`,
  };
};

interface ActionData {
  errors?: Partial<CreateEnvironmentDTO>;
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const projectId = params.id!;
  const formData = await request.formData();
  const projectName = formData.get("env-name")?.toString();

  const errors = validateEnvName({ name: projectName });

  if (errors?.name) {
    return { errors };
  }

  const session = await getSession(request.headers.get("Cookie"));

  const env: Environment = await createEnv(
    projectId,
    projectName!,
    session.get("auth-cookie")
  );

  return redirect(
    `/dashboard/projects/${projectId}?newEnvId=${env.uuid}#env-added`
  );
};

export default function CreateEnvironmentPage() {
  const transition = useTransition();
  const data = useActionData<ActionData>();
  const { project } = useProject();

  const errors = data?.errors;

  return (
    <Form method="post">
      <CreateEntityLayout
        status={errors?.name && <ErrorBox list={errors} />}
        titleSlot={<CreateEntityTitle>Create an environment</CreateEntityTitle>}
        submitSlot={
          <SubmitButton
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Creating the environment, please wait..."
          >
            Create the environment
          </SubmitButton>
        }
        backLinkSlot={
          <BackLink to={`/dashboard/projects/${project.uuid}`}>
            Back to project
          </BackLink>
        }
      >
        <TextInput
          isInvalid={Boolean(errors?.name)}
          name="env-name"
          placeholder="e.g: Staging"
          label="Environment name"
        />
      </CreateEntityLayout>
    </Form>
  );
}
