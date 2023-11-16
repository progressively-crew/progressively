import { ButtonCopy } from "~/components/ButtonCopy";
import { Section, SectionHeader } from "~/components/Section";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { UserRoles } from "~/modules/projects/types";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { VisuallyHidden } from "~/components/VisuallyHidden";
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
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import { FlagEnv } from "~/modules/flags/types";
import { FlagEnvList } from "~/modules/flags/components/FlagEnvList";
import { getSession } from "~/sessions";

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | Settings`,
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
  const { project, userRole } = useProject();
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
      subNav={<ProjectNavBar project={project} />}
    >
      <PageTitle value={environment.name} />

      <Card
        footer={
          <ButtonCopy toCopy={environment.clientKey}>
            {environment.clientKey}
          </ButtonCopy>
        }
      >
        <CardContent>
          <Section id="general">
            <SectionHeader
              title="General"
              description={
                "The following is the client key to use inside your application to retrieve the flags"
              }
            />
          </Section>
        </CardContent>
      </Card>

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

      {userRole === UserRoles.Admin && (
        <Card
          footer={
            <DeleteButton
              to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/delete`}
            >
              <span aria-hidden>
                Delete{" "}
                <span className="hidden md:inline">
                  {`"${environment.name}"`} forever
                </span>
              </span>

              <VisuallyHidden>
                Delete {`"${environment.name}"`} forever
              </VisuallyHidden>
            </DeleteButton>
          }
        >
          <CardContent>
            <Section id="danger">
              <SectionHeader
                title="Danger zone"
                titleAs="h3"
                description={
                  "You can delete an environment at any time, but you won't be able to access its flags will be removed and be falsy in your applications. Be sure to know what you're doing before removing an environment."
                }
              />

              <Spacer size={4} />
            </Section>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
