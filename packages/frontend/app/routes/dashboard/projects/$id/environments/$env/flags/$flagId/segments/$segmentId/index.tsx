import { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { Card, CardContent } from "~/components/Card";
import { TextInput } from "~/components/Fields/TextInput";
import { PageTitle } from "~/components/PageTitle";
import { Section, SectionHeader } from "~/components/Section";
import { Typography } from "~/components/Typography";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { RuleType } from "~/modules/rules/types";
import { SegmentRulesForm } from "~/modules/segments/components/SegmentRulesForm";
import { createSegmentRuleAction } from "~/modules/segments/form-actions/createSegmentRuleAction";
import { editSegmentAction } from "~/modules/segments/form-actions/editSegmentAction";
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
  rule?: RuleType;
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

  const type = formData.get("_type");

  if (type === "toggle-flag") {
    return toggleFlagAction(formData, params, authCookie);
  }

  if (type === "edit-segment") {
    return editSegmentAction(formData, segmentId, authCookie);
  }

  if (type === "create-segment-rule") {
    return createSegmentRuleAction(segmentId, authCookie);
  }

  return {};
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
  const navigation = useNavigation();
  const type = navigation?.formData?.get("_type");
  const isCreatingRule = type === "create-segment-rule";

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
        <Form method="post">
          <input type="hidden" name="_type" value="edit-segment" />
          <Card
            footer={
              <SubmitButton variant="secondary">Save the segment</SubmitButton>
            }
          >
            <CardContent>
              <SectionHeader
                title={"General information"}
                description={
                  <Typography>General information about the segment</Typography>
                }
              />

              <div className="pt-4">
                <TextInput
                  name={"name"}
                  label={"Name of the segment"}
                  defaultValue={segment.name}
                />
              </div>
            </CardContent>
          </Card>
        </Form>
      </Section>

      <Section id="rules">
        <Card
          footer={
            <div className="flex flex-row gap-6">
              <Form method="post">
                <input type="hidden" name="_type" value="create-segment-rule" />
                <SubmitButton
                  variant="secondary"
                  isLoading={isCreatingRule}
                  loadingText="Creating a new segment rule..."
                >
                  Add a new rule
                </SubmitButton>
              </Form>

              <SubmitButton loadingText="Updating the segment rules...">
                Save the rules
              </SubmitButton>
            </div>
          }
        >
          <CardContent>
            <SectionHeader
              title={"Rules"}
              description={
                <Typography>
                  Rules to validate to be part of the segment.
                </Typography>
              }
            />

            <div className="pt-4">
              <SegmentRulesForm rules={segment.rule} />
            </div>
          </CardContent>
        </Card>
      </Section>
    </DashboardLayout>
  );
}