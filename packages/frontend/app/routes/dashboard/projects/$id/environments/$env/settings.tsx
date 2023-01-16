import { ButtonCopy } from "~/components/ButtonCopy";
import { Section, SectionHeader } from "~/components/Section";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { UserRoles } from "~/modules/projects/types";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { EnvNavBar } from "~/modules/environments/components/EnvNavbar";
import { MetaFunction } from "@remix-run/node";
import { Card, CardContent } from "~/components/Card";
import { Stack } from "~/components/Stack";
import { AiOutlineSetting } from "react-icons/ai";
import { useUser } from "~/modules/user/contexts/useUser";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { Spacer } from "~/components/Spacer";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);

  return {
    title: `Progressively | ${projectName} | ${envName} | Settings`,
  };
};

export default function EnvSettingsPage() {
  const { user } = useUser();
  const { project, userRole } = useProject();
  const { environment } = useEnvironment();

  return (
    <DashboardLayout
      user={user}
      subNav={<EnvNavBar projectId={project.uuid} envId={environment.uuid} />}
    >
      <PageTitle value="Settings" />

      <Stack spacing={8}>
        <Card>
          <CardContent>
            <Section id="general">
              <SectionHeader
                title="General"
                description={
                  "The following is the client key to use inside your application to retrieve the flags"
                }
              />

              <Spacer size={4} />

              <ButtonCopy toCopy={environment.clientKey}>
                {environment.clientKey}
              </ButtonCopy>
            </Section>
          </CardContent>
        </Card>

        {userRole === UserRoles.Admin && (
          <Card>
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

                <div className="inline-block">
                  <DeleteButton
                    variant="secondary"
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
                </div>
              </Section>
            </CardContent>
          </Card>
        )}
      </Stack>
    </DashboardLayout>
  );
}
