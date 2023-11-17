import { Section, SectionHeader } from "~/components/Section";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { Card, CardContent } from "~/components/Card";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { Spacer } from "~/components/Spacer";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import { FlagEnv } from "~/modules/flags/types";
import { FlagEnvList } from "~/modules/flags/components/FlagEnvList";
import { getSession } from "~/sessions";
import { EnvNavBar } from "~/modules/environments/components/EnvNavBar";

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
      <PageTitle value={environment.name} />

      {flagEnvs.length > 0 && (
        <Section>
          <Card>
            <CardContent>
              <SectionHeader
                title="Feature flags"
                description={
                  "The feature flags status in this specific environment."
                }
              />
            </CardContent>

            <Spacer size={2} />
            <FlagEnvList flagEnvs={flagEnvs} projectId={project.uuid} />
          </Card>
        </Section>
      )}
    </DashboardLayout>
  );
}
