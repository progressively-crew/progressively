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
import { ActionFunction, redirect, V2_MetaFunction } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";
import { DialogCloseBtn } from "~/components/Dialog/Dialog";
import { FormGroup } from "~/components/Fields/FormGroup";

export const meta: V2_MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Create an environment`,
    },
  ];
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
  const envName = formData.get("env-name")?.toString();
  const domain = formData.get("domain")?.toString();

  const errors = validateEnvName({ name: envName, domain });

  if (errors?.name) {
    return { errors };
  }

  const session = await getSession(request.headers.get("Cookie"));

  const env: Environment = await createEnv(
    projectId,
    envName!,
    session.get("auth-cookie"),
    domain
  );

  return redirect(
    `/dashboard/projects/${projectId}/environments/${env.uuid}/settings?envCreated=true`
  );
};

export default function CreateEnvironmentPage() {
  const navigation = useNavigation();
  const data = useActionData<ActionData>();
  const { project } = useProject();

  const errors = data?.errors;

  return (
    <Form method="post" className="flex flex-col flex-1">
      <CreateEntityLayout
        status={errors?.name && <ErrorBox list={errors} />}
        titleSlot={<CreateEntityTitle>Create an environment</CreateEntityTitle>}
        submitSlot={
          <SubmitButton
            type="submit"
            isLoading={navigation.state === "submitting"}
            loadingText="Creating the environment, please wait..."
          >
            Create the environment
          </SubmitButton>
        }
        closeSlot={
          <DialogCloseBtn
            to={`/dashboard/projects/${project.uuid}/settings`}
            label={`Back to project`}
          />
        }
      >
        <FormGroup>
          <TextInput
            isInvalid={Boolean(errors?.name)}
            name="env-name"
            placeholder="e.g: Staging"
            label="Environment name"
          />

          <TextInput
            isInvalid={Boolean(errors?.domain)}
            name="domain"
            placeholder="progressively.app"
            label="Domain"
          />
        </FormGroup>
      </CreateEntityLayout>
    </Form>
  );
}
