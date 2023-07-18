import { ActionFunction, redirect, V2_MetaFunction } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { createFlag } from "~/modules/flags/services/createFlag";
import { CreateFlagDTO, Flag } from "~/modules/flags/types";
import { validateFlagShape } from "~/modules/flags/validators/validateFlagShape";
import { getSession } from "~/sessions";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { BackLink } from "~/components/BackLink";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";

export const meta: V2_MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Flags | Create`,
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
  const name = formData.get("flag-name")?.toString();
  const description = formData.get("flag-desc")?.toString();

  const errors = validateFlagShape({ name, description });

  if (errors?.name || errors?.description) {
    return { errors };
  }

  const session = await getSession(request.headers.get("Cookie"));

  try {
    const newFlag: Flag = await createFlag(
      projectId,
      name!,
      description!,
      session.get("auth-cookie")
    );

    return redirect(
      `/dashboard/projects/${projectId}/flags?newFlagId=${newFlag.uuid}#flag-added`
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { name: error.message } };
    }

    return { errors: { name: "An error ocurred" } };
  }
};

export default function CreateFlagPage() {
  const { project } = useProject();
  const data = useActionData<ActionData>();
  const transition = useTransition();

  const errors = data?.errors;

  return (
    <Form method="post" className="flex flex-col flex-1">
      <CreateEntityLayout
        status={
          (errors?.name || errors?.description) && <ErrorBox list={errors} />
        }
        titleSlot={<CreateEntityTitle>Create a feature flag</CreateEntityTitle>}
        submitSlot={
          <SubmitButton
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Creating the feature flag, please wait..."
          >
            Create the feature flag
          </SubmitButton>
        }
        backLinkSlot={
          <BackLink to={`/dashboard/projects/${project.uuid}/flags`}>
            Back to project
          </BackLink>
        }
      >
        <FormGroup>
          <TextInput
            name="flag-name"
            isInvalid={Boolean(errors?.name)}
            label="Flag name"
            placeholder="e.g: New Homepage"
          />

          <TextInput
            name="flag-desc"
            isInvalid={Boolean(errors?.description)}
            label="Flag description"
            placeholder="e.g: The new homepage"
          />
        </FormGroup>
      </CreateEntityLayout>
    </Form>
  );
}
