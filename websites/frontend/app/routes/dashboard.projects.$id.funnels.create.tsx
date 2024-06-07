import {
  ActionFunction,
  LoaderFunction,
  redirect,
  MetaFunction,
} from "@remix-run/node";
import {
  useActionData,
  Form,
  useNavigation,
  useLoaderData,
} from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { CreateFlagDTO, FlagWithVariant } from "~/modules/flags/types";
import { getSession } from "~/sessions";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";
import { DialogCloseBtn } from "~/components/Dialog/Dialog";
import { createFunnel } from "~/modules/projects/services/createFunnel";
import { SelectField } from "~/components/Fields/Select/SelectField";
import { useMemo, useReducer } from "react";
import { Typography } from "~/components/Typography";
import { getProjectFlags } from "~/modules/projects/services/getProjectFlags";
import {
  funnelCreationReducer,
  initialState,
  getInitialState,
} from "~/modules/projects/reducers/funnelCreationReducer";
import { ReservedEventName } from "~/modules/events/types";
import { getFunnelsFields } from "~/modules/projects/services/getFunnelsFields";

export const meta: MetaFunction = ({ matches }) => {
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
    const newFunnel = await createFunnel(
      projectId,
      name!,
      funnelEntries,
      session.get("auth-cookie")
    );

    return redirect(
      `/dashboard/projects/${projectId}/funnels?newFunnelId=${newFunnel.uuid}#funnel-added`
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { name: error.message } };
    }

    return { errors: { name: "An error ocurred" } };
  }
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  const strDays = search.get("days");
  let day = Number(strDays);
  if (!day || Number.isNaN(day)) {
    day = 7;
  }

  const authCookie = session.get("auth-cookie");

  const projectId = params.id!;

  const [flags, [eventNames, pageViewUrls]] = await Promise.all([
    getProjectFlags(projectId, authCookie),
    getFunnelsFields(projectId, day, authCookie),
  ]);

  return { eventNames, flags, pageViewUrls };
};

export default function CreateFunnel() {
  const { project } = useProject();
  const data = useActionData<ActionData>();
  const navigation = useNavigation();

  const { flags, eventNames, pageViewUrls } = useLoaderData<typeof loader>();
  const [state, dispatch] = useReducer(
    funnelCreationReducer,
    initialState,
    () => getInitialState(flags, eventNames)
  );

  const flagDict = useMemo(() => {
    return flags.reduce((acc, curr) => {
      acc[curr.uuid] = curr;
      return acc;
    }, {} as Record<string, FlagWithVariant>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { funnelEntries, eventNameOptions, flagOptions } = state;
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

          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label={"Event name"}
              options={eventNameOptions}
              name={"event-name"}
              onValueChange={selectEventName}
            />

            <SelectField
              label={"Flag name"}
              options={flagOptions}
              name={"flag-name"}
              onValueChange={selectFlag}
            />
          </div>

          <ol className="flex flex-col gap-1">
            {funnelEntries.map((funnelEntry) => {
              const flag = funnelEntry.flagUuid
                ? flagDict[funnelEntry.flagUuid]
                : undefined;

              let variants: Array<{ label: string; value: string }> | undefined;

              if (flag) {
                variants =
                  flag.variants.length > 0
                    ? flag?.variants.map((v: { value: string }) => ({
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
                  className="flex flex-row justify-between bg-gray-50 pr-2 pl-4 rounded-lg items-center h-14"
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
                      onValueChange={(v) => selectVariant(flag!.uuid, v)}
                      hiddenLabel
                    />
                  )}

                  {funnelEntry.eventName === ReservedEventName.PageView && (
                    <SelectField
                      label={"URL"}
                      options={pageViewUrls.map(({ url }) => ({
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
