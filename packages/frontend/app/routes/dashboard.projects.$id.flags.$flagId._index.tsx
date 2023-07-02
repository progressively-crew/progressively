import { DashboardLayout } from "~/layouts/DashboardLayout";
import { UserRoles } from "~/modules/projects/types";
import { Section, SectionHeader } from "~/components/Section";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { V2_MetaFunction } from "@remix-run/node";
import { Card, CardContent } from "~/components/Card";
import { ButtonCopy } from "~/components/ButtonCopy";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { useFlag } from "~/modules/flags/contexts/useFlag";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { Typography } from "~/components/Typography";

export const meta: V2_MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);
  const flagName = getFlagMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${flagName} | Settings`,
    },
  ];
};

export default function FlagSettingPage() {
  const { project, userRole } = useProject();
  const { user } = useUser();
  const { flag } = useFlag();

  return (
    <DashboardLayout user={user}>
      <PageTitle
        value="Settings"
        description={
          <Typography as="span">
            Settings available for{" "}
            <strong className="font-bold">{flag.name}</strong>.
          </Typography>
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
                <span className="hidden md:inline">{flag.name} forever</span>
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
    </DashboardLayout>
  );
}
