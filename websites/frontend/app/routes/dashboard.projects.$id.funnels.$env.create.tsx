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
import { CreateFlagDTO, Flag, FlagEnv } from "~/modules/flags/types";
import { getSession } from "~/sessions";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";
import { DialogCloseBtn } from "~/components/Dialog/Dialog";
import { createFunnel } from "~/modules/environments/services/createFunnel";
import { getDistinctEventName } from "~/modules/environments/services/getDistinctEventName";
import { SelectField } from "~/components/Fields/Select/SelectField";
import { useMemo, useReducer } from "react";
import { Typography } from "~/components/Typography";
import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import {
  funnelCreationReducer,
  getInitialState,
  initialState,
} from "~/modules/environments/reducers/funnelCreationReducer";
import { getPageViewEvent } from "~/modules/environments/services/getPageViewEvent";

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
  flagEnvs: Array<FlagEnv>;
  pageViewUrls: Array<string>;
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const projectId = params.id!;
  const envId = params.env!;
  const formData = await request.formData();
  const name = formData.get("funnel-name")?.toString();
  const funnelEntries = formData
    .getAll("funnel-entry")
    .map((x) => JSON.parse(x.toString()));

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
      funnelEntries,
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

  const flagEnvs: Array<FlagEnv> = await getFlagsByProjectEnv(
    envId,
    authCookie
  );

  const eventNames: Array<string> = await getDistinctEventName(
    envId,
    start,
    end,
    authCookie
  );

  const pageViewUrls: Array<string> = await getPageViewEvent(
    envId,
    start,
    end,
    authCookie
  );

  return { eventNames, flagEnvs, pageViewUrls };
};

export default function CreateFunnel() {
  const { project } = useProject();
  const data = useActionData<ActionData>();
  const navigation = useNavigation();
  const params = useParams();
  const { flagEnvs, eventNames, pageViewUrls } = useLoaderData<LoaderData>();
  const [state, dispatch] = useReducer(
    funnelCreationReducer,
    initialState,
    () => getInitialState(flagEnvs, eventNames)
  );

  const flagEnvDict = useMemo(() => {
    // eslint-disable-next-line unicorn/no-array-reduce
    return flagEnvs.reduce((acc, curr) => {
      acc[curr.flagId] = curr;
      return acc;
    }, {} as Record<string, FlagEnv>);
  }, []);

  const { funnelEntries, eventNameOptions, flagEnvsOptions } = state;
  const errors = data?.errors;

  const selectFlag = (flagId: string) => dispatch({ type: "SET_FLAG", flagId });

  const selectEventName = (eventName: string) =>
    dispatch({ type: "SET_EVENT", eventName });

  const selectVariant = (flagId: string, variant: string) =>
    dispatch({ type: "SET_VARIANT", flagId, variant });

  const selectPageViewUrl = (url: string) =>
    dispatch({ type: "SET_PAGE_VIEW_URL", url });

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

          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label={"Event name"}
              options={eventNameOptions}
              name={"event-name"}
              onValueChange={selectEventName}
            />

            <SelectField
              label={"Flag name"}
              options={flagEnvsOptions}
              name={"flag-name"}
              onValueChange={selectFlag}
            />
          </div>

          <ol className="flex flex-col gap-1">
            {funnelEntries.map((funnelEntry) => {
              const flagEnv = funnelEntry.flagUuid
                ? flagEnvDict[funnelEntry.flagUuid]
                : undefined;

              let variants: Array<{ label: string; value: string }> | undefined;

              if (flagEnv) {
                variants = [];
                variants =
                  flagEnv.variants.length > 0
                    ? flagEnv?.variants.map((v) => ({
                        label: v.value,
                        value: v.value,
                      }))
                    : [true, false].map((v) => ({
                        label: String(v),
                        value: String(v),
                      }));
              }

              return (
                <li
                  key={funnelEntry.eventName || funnelEntry.flagUuid}
                  className="flex flex-row justify-between dark:bg-slate-700 bg-slate-50 pr-2 pl-4 rounded-lg items-center h-14"
                >
                  <div>
                    <input
                      type="hidden"
                      name="funnel-entry"
                      value={JSON.stringify(funnelEntry)}
                    />
                    <Typography as="span" className="text-sm font-semibold">
                      {funnelEntry.eventName || funnelEntry.flagName || ""}
                    </Typography>
                  </div>

                  {variants && (
                    <SelectField
                      label={"Variant name"}
                      options={variants}
                      name={"variant-name"}
                      onValueChange={(v) => selectVariant(flagEnv!.flagId!, v)}
                      hiddenLabel
                    />
                  )}

                  {funnelEntry.eventName === "Page View" && (
                    <SelectField
                      label={"URL"}
                      options={pageViewUrls.map((url) => ({
                        label: url,
                        value: url,
                      }))}
                      name={"url"}
                      onValueChange={(url) => selectPageViewUrl(url)}
                      hiddenLabel
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </FormGroup>
      </CreateEntityLayout>
    </Form>
  );
}
