import { UserRoles } from "~/modules/projects/types";
import { Section, SectionHeader } from "~/components/Section";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { Card, CardContent } from "~/components/Card";
import { ButtonCopy } from "~/components/ButtonCopy";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { Button } from "~/components/Buttons/Button";
import { SettingLayout } from "~/layouts/SettingLayout";
import { BackLink } from "~/components/BackLink";
import { FlagProvider } from "~/modules/flags/contexts/FlagProvider";
import { getFlagById } from "~/modules/flags/services/getFlagById";
import { FlagWithEnvs } from "~/modules/flags/types";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getSession } from "~/sessions";

export const meta: V2_MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);
  const flagName = getFlagMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${flagName} | Settings`,
    },
  ];
};

interface LoaderData {
  flag: FlagWithEnvs;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const flag: FlagWithEnvs = await getFlagById(params.flagId!, authCookie);

  return {
    flag,
  };
};

export default function FlagSettingPage() {
  const { project, userRole } = useProject();
  const { flag } = useLoaderData<LoaderData>();

  return (
    <FlagProvider flag={flag}>
      <>
        <SettingLayout
          backLink={
            <BackLink to={`/dashboard/projects/${project.uuid}/flags`}>
              {project.name}
            </BackLink>
          }
        >
          <PageTitle
            value={flag.name}
            action={
              <Button
                to={`/dashboard/projects/${project.uuid}/flags/${flag.uuid}/edit`}
                variant="secondary"
              >
                Edit
              </Button>
            }
            description={
              <>
                Settings of the feature flag <strong>{flag.name}</strong>.
              </>
            }
          />

          <Card footer={<ButtonCopy toCopy={flag.key}>{flag.key}</ButtonCopy>}>
            <CardContent>
              <Section id="general">
                <SectionHeader
                  title="General"
                  description={
                    "The following is the flag key to use inside your application to get the flag variation"
                  }
                />
              </Section>
            </CardContent>
          </Card>

          {userRole === UserRoles.Admin && (
            <Card
              footer={
                <DeleteButton
                  to={`/dashboard/projects/${project.uuid}/flags/${flag.uuid}/delete`}
                >
                  <span aria-hidden>
                    <span>Delete </span>
                    <span className="hidden md:inline">
                      {flag.name} forever
                    </span>
                  </span>

                  <VisuallyHidden>{`Delete ${flag.name} forever`}</VisuallyHidden>
                </DeleteButton>
              }
            >
              <CardContent>
                <Section id="danger">
                  <SectionHeader
                    title="Danger zone"
                    titleAs="h3"
                    description={
                      "You can delete a feature flag at any time, but you  won't be able to access its insights anymore and false will be served to the application using it."
                    }
                  />
                </Section>
              </CardContent>
            </Card>
          )}
        </SettingLayout>
        <Outlet />
      </>
    </FlagProvider>
  );
}
