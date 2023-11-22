import { Section } from "~/components/Section";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import { FlagEnv } from "~/modules/flags/types";
import { FlagEnvList } from "~/modules/flags/components/FlagEnvList";
import { getSession } from "~/sessions";
import { EnvNavBar } from "~/modules/environments/components/EnvNavBar";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Card, CardContent } from "~/components/Card";
import { EmptyState } from "~/components/EmptyState";

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | Feature flags`,
    },
  ];
};

interface LoaderData {
  flagEnvs: Array<FlagEnv>;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const flagEnvs: Array<FlagEnv> = await getFlagsByProjectEnv(
    params.env!,
    authCookie
  );

  return { flagEnvs };
};

export default function EnvSettingsPage() {
  const { project } = useProject();
  const { environment } = useEnvironment();
  const [searchParams] = useSearchParams();
  const { flagEnvs } = useLoaderData<LoaderData>();
  const envCreated = searchParams.get("envCreated") || undefined;

  return (
    <DashboardLayout
      status={
        envCreated ? (
          <SuccessBox id="env-added">
            The environment has been successfully created.
          </SuccessBox>
        ) : null
      }
      subNav={<EnvNavBar project={project} environment={environment} />}
    >
      <PageTitle
        value="Feature flags"
        description="Configuration of the feature flags for this specific environment."
      />

      {flagEnvs.length > 0 ? (
        <Section>
          <FlagEnvList flagEnvs={flagEnvs} projectId={project.uuid} />
        </Section>
      ) : (
        <Card>
          <CardContent>
            <EmptyState
              titleAs="h2"
              title="No flags found"
              description={"There are no flags yet on this environment."}
              action={
                <CreateButton
                  to={`/dashboard/projects/${project.uuid}/flags/create`}
                >
                  Create a feature flag
                </CreateButton>
              }
            />
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
