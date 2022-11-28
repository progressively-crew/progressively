import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { Section } from "~/components/Section";
import { Typography } from "~/components/Typography";
import { createFlag } from "~/modules/flags/services/createFlag";
import { CreateFlagDTO, Flag, FlagType } from "~/modules/flags/types";
import { validateFlagShape } from "~/modules/flags/validators/validateFlagShape";
import { getSession } from "~/sessions";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { Card, CardContent } from "~/components/Card";
import { SelectField } from "~/components/Fields/SelectField";
import { Header } from "~/components/Header";
import { EnvIcon } from "~/components/Icons/EnvIcon";
import { TagLine } from "~/components/Tagline";
import { ReleaseIcon } from "~/components/Icons/ReleaseIcon";
import { ExperimentIcon } from "~/components/Icons/ExperimentIcon";
import { PermissionIcon } from "~/components/Icons/PermissionIcon";
import { KillSwitchIcon } from "~/components/Icons/KillSwitchIcon";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";

export const handle = {
  breadcrumb: (match: { params: any }) => {
    return {
      link: `/dashboard/projects/${match.params.id}/environments/${match.params.env}/flags/create`,
      label: "Create a feature flag",
    };
  },
};

export const meta: MetaFunction = ({ params, parentsData }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | Create`,
  };
};

interface ActionData {
  errors?: Partial<CreateFlagDTO>;
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const projectId = params.id!;
  const envId = params.env!;
  const formData = await request.formData();
  const name = formData.get("flag-name")?.toString();
  const description = formData.get("flag-desc")?.toString();
  const type = formData.get("type")?.toString() as FlagType;

  const errors = validateFlagShape({ name, description });

  if (errors?.name || errors?.description) {
    return { errors };
  }

  const session = await getSession(request.headers.get("Cookie"));

  try {
    const newFlag: Flag = await createFlag(
      envId,
      name!,
      description!,
      type!,
      session.get("auth-cookie")
    );

    return redirect(
      `/dashboard/projects/${projectId}/environments/${envId}?newFlagId=${newFlag.uuid}#flag-added`
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
  const { user } = useUser();
  const data = useActionData<ActionData>();
  const transition = useTransition();
  const { environment } = useEnvironment();

  const errors = data?.errors;

  return (
    <CreateEntityLayout
      user={user}
      header={
        <Header
          tagline={<TagLine icon={<EnvIcon />}>ENVIRONMENT</TagLine>}
          title={environment.name}
        />
      }
      status={
        (errors?.name || errors?.description) && <ErrorBox list={errors} />
      }
      title={
        <PageTitle
          value="Create a feature flag"
          description={
            <Typography>
              The new feature flag will appear in{" "}
              <strong>{project.name}</strong> /{" "}
              <strong>{environment.name}</strong>. After the creation of a
              feature flag, you will be able to get its SDK key for application
              usage.
            </Typography>
          }
        />
      }
    >
      <Card>
        <CardContent>
          <Section>
            <Form method="post">
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

                <div>
                  <SelectField
                    isInvalid={Boolean(errors?.type)}
                    name="type"
                    label="Type"
                    options={[
                      {
                        value: FlagType.RELEASE,
                        label: "Release",
                        icon: <ReleaseIcon />,
                      },
                      {
                        value: FlagType.EXPERIMENT,
                        label: "Experiment",
                        icon: <ExperimentIcon />,
                      },
                      {
                        value: FlagType.PERMISSION,
                        label: "Permission",
                        icon: <PermissionIcon />,
                      },
                      {
                        value: FlagType.KILL_SWITCH,
                        label: "Kill switch",
                        icon: <KillSwitchIcon />,
                      },
                    ]}
                  />
                </div>

                <div>
                  <SubmitButton
                    type="submit"
                    isLoading={transition.state === "submitting"}
                    loadingText="Creating the feature flag, please wait..."
                  >
                    Create the feature flag
                  </SubmitButton>
                </div>
              </FormGroup>
            </Form>
          </Section>
        </CardContent>
      </Card>
    </CreateEntityLayout>
  );
}
