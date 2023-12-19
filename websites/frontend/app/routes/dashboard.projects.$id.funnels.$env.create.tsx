import {
  ActionFunction,
  LoaderFunction,
  redirect,
  V2_MetaFunction,
} from "@remix-run/node";
import {
  useActionData,
  Form,
  useNavigation,
  useParams,
  useLoaderData,
} from "@remix-run/react";
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
import { createFunnel } from "~/modules/environments/services/createFunnel";
import { getDistinctEventName } from "~/modules/environments/services/getDistinctEventName";
import { SelectField } from "~/components/Fields/Select/SelectField";

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

interface LoaderData {
  eventNames: Array<string>;
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const projectId = params.id!;
  const envId = params.env!;
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
    const newFunnel: Flag = await createFunnel(
      envId,
      name!,
      session.get("auth-cookie")
    );

    return redirect(
      `/dashboard/projects/${projectId}/funnels?newFunnelId=${newFunnel.uuid}&envId=${envId}#funnel-added`
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { name: error.message } };
    }

    return { errors: { name: "An error ocurred" } };
  }
};

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const envId = params.env;

  if (!envId) {
    throw redirect("/401");
  }

  const strDays = search.get("days");
  let day = Number(strDays);
  if (!day || Number.isNaN(day)) {
    day = 7;
  }

  const start = new Date();
  start.setDate(start.getDate() - day);

  const end = new Date();
  end.setDate(end.getDate() + 1);

  const authCookie = session.get("auth-cookie");

  const eventNames: Array<string> = await getDistinctEventName(
    envId,
    start,
    end,
    authCookie
  );

  return { eventNames };
};

export default function CreateFunnel() {
  const { project } = useProject();
  const data = useActionData<ActionData>();
  const { eventNames } = useLoaderData<LoaderData>();
  const navigation = useNavigation();
  const params = useParams();

  const errors = data?.errors;

  const eventNamesOptions = eventNames.map((ev) => ({ label: ev, value: ev }));

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
            to={`/dashboard/projects/${project.uuid}/funnels?envId=${params.env}`}
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
          <SelectField
            label={"Event name"}
            options={eventNamesOptions}
            name={"event-name"}
          />
        </FormGroup>
      </CreateEntityLayout>
    </Form>
  );
}
