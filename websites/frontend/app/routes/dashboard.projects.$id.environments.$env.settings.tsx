import { ButtonCopy } from "~/components/ButtonCopy";
import { Section, SectionHeader } from "~/components/Section";
import { UserRoles } from "~/modules/projects/types";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { V2_MetaFunction } from "@remix-run/node";
import { Card, CardContent } from "~/components/Card";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { Spacer } from "~/components/Spacer";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { useSearchParams } from "@remix-run/react";
import { SettingLayout } from "~/layouts/SettingLayout";
import { BackLink } from "~/components/BackLink";

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | Settings`,
    },
  ];
};

export default function EnvSettingsPage() {
  const { project, userRole } = useProject();
  const { environment } = useEnvironment();
  const [searchParams] = useSearchParams();
  const envCreated = searchParams.get("envCreated") || undefined;

  return (
    <SettingLayout
      status={
        envCreated ? (
          <SuccessBox id="env-added">
            The environment has been successfully created.
          </SuccessBox>
        ) : null
      }
      backLink={
        <BackLink to={`/dashboard/projects/${project.uuid}/settings`}>
          {project.name}
        </BackLink>
      }
    >
      <PageTitle
        value={environment.name}
        description={
          <>
            Settings of the environment <strong>{environment.name}</strong>.
          </>
        }
      />

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
    </SettingLayout>
  );
}
