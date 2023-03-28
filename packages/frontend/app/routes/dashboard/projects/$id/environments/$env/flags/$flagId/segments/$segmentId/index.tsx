import { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { Card, CardContent } from "~/components/Card";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { PageTitle } from "~/components/PageTitle";
import { Section, SectionHeader } from "~/components/Section";
import { Typography } from "~/components/Typography";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { editSegment } from "~/modules/segments/services/editSegment";
import { getSegment } from "~/modules/segments/services/getSegment";
import { Segment } from "~/modules/segments/types";
import { useUser } from "~/modules/user/contexts/useUser";
import { getSession } from "~/sessions";

export const meta: MetaFunction = ({ parentsData, params, data }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);
  const segmentName = data?.segment?.name || "";

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Segments | ${segmentName}`,
  };
};

export interface ActionData {
  segment?: Segment;
  errors?: {
    invalidField?: string;
  };
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const segmentId = params.segmentId!;
  const formData = await request.formData();
  const name = formData.get("name");

  if (!name) {
    return {
      errors: {
        invalidField: "Name is a mandatory field",
      },
    };
  }

  const updatedSegment = await editSegment(
    name.toString(),
    segmentId,
    authCookie
  );

  return {
    segment: updatedSegment,
  };
};

interface LoaderData {
  segment: Segment;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const segment: Segment = await getSegment(params.segmentId!, authCookie);

  return {
    segment,
  };
};

export default function Segments() {
  const { user } = useUser();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();
  const { segment } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();

  return (
    <DashboardLayout
      user={user}
      subNav={
        <FlagMenu
          projectId={project.uuid}
          envId={environment.uuid}
          flagEnv={flagEnv}
        />
      }
      status={
        actionData?.segment ? (
          <SuccessBox id="segment-edited">
            The segment has been successfully edited.
          </SuccessBox>
        ) : actionData?.errors ? (
          <ErrorBox list={actionData?.errors} />
        ) : null
      }
    >
      <PageTitle
        value={`Segments "${segment.name}"`}
        description={
          <Typography>Informations regarding the given segment.</Typography>
        }
      />

      <Section id="general-informations">
        <Card>
          <CardContent>
            <SectionHeader
              title={"General information"}
              description={
                <Typography>General information about the segment</Typography>
              }
            />

            <Form method="post">
              <FormGroup>
                <TextInput name={"name"} label={"Name of the segment"} />
                <div>
                  <SubmitButton>Save the segment</SubmitButton>
                </div>
              </FormGroup>
            </Form>
          </CardContent>
        </Card>
      </Section>
    </DashboardLayout>
  );
}
