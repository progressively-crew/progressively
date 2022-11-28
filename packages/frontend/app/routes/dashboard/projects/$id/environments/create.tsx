import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { createEnv } from "~/modules/environments/services/createEnv";
import {
  CreateEnvironmentDTO,
  Environment,
} from "~/modules/environments/types";
import { validateEnvName } from "~/modules/environments/validators/validateEnvName";
import { getSession } from "~/sessions";
import { Section } from "~/components/Section";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";
import { FormGroup } from "~/components/Fields/FormGroup";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { Card, CardContent } from "~/components/Card";
import { Header } from "~/components/Header";
import { ProjectIcon } from "~/components/Icons/ProjectIcon";
import { TagLine } from "~/components/Tagline";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";

export const handle = {
  breadcrumb: (match: { params: any }) => {
    return {
      link: `/dashboard/projects/${match.params.id}/environments/create`,
      label: "Create an environment",
    };
  },
};

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
  const { user } = useUser();
  const errors = data?.errors;

  return (
    <CreateEntityLayout
      user={user}
      header={
        <Header
          tagline={<TagLine icon={<ProjectIcon />}>PROJECT</TagLine>}
          title={project.name}
        />
      }
      status={errors?.name && <ErrorBox list={errors} />}
      title={
        <PageTitle
          value="Create an environment"
          description={
            <Typography>
              The new environment will appear in <strong>{project.name}</strong>
              . After the creation of an environment, you will be able to get
              its SDK key for application usage.
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
                <div>
                  <TextInput
                    isInvalid={Boolean(errors?.name)}
                    name="env-name"
                    placeholder="e.g: Staging"
                    label="Environment name"
                  />
                </div>

                <div>
                  <SubmitButton
                    type="submit"
                    isLoading={transition.state === "submitting"}
                    loadingText="Creating the environment, please wait..."
                  >
                    Create the environment
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
