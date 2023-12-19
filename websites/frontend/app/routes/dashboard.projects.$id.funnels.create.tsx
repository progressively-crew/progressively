import { ActionFunction, redirect, V2_MetaFunction } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { CreateFlagDTO, Flag } from "~/modules/flags/types";
import { getSession } from "~/sessions";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";
import { DialogCloseBtn } from "~/components/Dialog/Dialog";
import { createFunnel } from "~/modules/projects/services/createFunnel";

export const meta: V2_MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Funnels | Create`,
    },
  ];
};

interface ActionData {
  errors?: Partial<CreateFlagDTO>;
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const projectId = params.id!;
  const formData = await request.formData();
  const name = formData.get("funnel-name")?.toString();

  const errors: Record<string, string> = {};

  if (!name) {
    errors.name = "The name field is required, make sure to have one.";
  }

  if (errors?.name) {
    return { errors };
  }

  const session = await getSession(request.headers.get("Cookie"));

  try {
    const newFlag: Flag = await createFunnel(
      projectId,
      name!,
      session.get("auth-cookie")
    );

    return redirect(
      `/dashboard/projects/${projectId}/funnels?newFunnelId=${newFlag.uuid}#funnel-added`
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { name: error.message } };
    }

    return { errors: { name: "An error ocurred" } };
  }
};

export default function CreateFunnel() {
  const { project } = useProject();
  const data = useActionData<ActionData>();
  const navigation = useNavigation();

  const errors = data?.errors;

  return (
    <Form method="post" className="flex flex-col flex-1">
      <CreateEntityLayout
        status={
          (errors?.name || errors?.description) && <ErrorBox list={errors} />
        }
        titleSlot={<CreateEntityTitle>Create a funnel</CreateEntityTitle>}
        submitSlot={
          <SubmitButton
            type="submit"
            isLoading={navigation.state === "submitting"}
            loadingText="Creating the funnel, please wait..."
          >
            Create the funnel
          </SubmitButton>
        }
        closeSlot={
          <DialogCloseBtn
            to={`/dashboard/projects/${project.uuid}/funnels`}
            label={`Back to funnels`}
          />
        }
      >
        <FormGroup>
          <TextInput
            name="funnel-name"
            isInvalid={Boolean(errors?.name)}
            label="Flag name"
            placeholder="e.g: New Homepage"
          />
        </FormGroup>
      </CreateEntityLayout>
    </Form>
  );
}
