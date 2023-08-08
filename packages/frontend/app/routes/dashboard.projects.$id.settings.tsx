import { Section, SectionHeader } from "~/components/Section";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { UserRoles } from "~/modules/projects/types";
import { UserTable } from "~/modules/user/components/UserTable";
import { V2_MetaFunction } from "@remix-run/node";
import { Card, CardContent } from "~/components/Card";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { Typography } from "~/components/Typography";
import { useSearchParams } from "@remix-run/react";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { VisuallyHidden } from "~/components/VisuallyHidden";

export const meta: V2_MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Settings`,
    },
  ];
};

export default function SettingsPage() {
  const { project, userRole } = useProject();
  const [searchParams] = useSearchParams();
  const isMemberRemoved = searchParams.get("memberRemoved") || undefined;

  return (
    <DashboardLayout
      subNav={<ProjectNavBar project={project} />}
      status={
        isMemberRemoved ? (
          <SuccessBox id={"plan-add-success"}>
            The member has been successfully removed.
          </SuccessBox>
        ) : null
      }
    >
      <PageTitle
        value="Settings"
        description={
          <Typography as="span">
            Settings available for{" "}
            <strong className="font-bold">{project.name}</strong>.
          </Typography>
        }
      />

      <Card>
        <Section id="members">
          <CardContent>
            <SectionHeader
              title="Project members"
              action={
                userRole === UserRoles.Admin && (
                  <CreateButton
                    variant="secondary"
                    to={`/dashboard/projects/${project.uuid}/add-member`}
                  >
                    Add member
                  </CreateButton>
                )
              }
            />
          </CardContent>

          <UserTable userProjects={project.userProject || []} />
        </Section>
      </Card>

      {userRole === UserRoles.Admin && (
        <Card
          footer={
            <DeleteButton to={`/dashboard/projects/${project.uuid}/delete`}>
              <span aria-hidden>
                Delete{" "}
                <span className="hidden md:inline">
                  {`"${project.name}"`} forever
                </span>
              </span>

              <VisuallyHidden>
                Delete {`"${project.name}"`} forever
              </VisuallyHidden>
            </DeleteButton>
          }
        >
          <CardContent>
            <Section id="danger">
              <SectionHeader
                title="Danger zone"
                description={
                  "You can delete a project at any time, but you won't be able to access its environments and all the related flags will be removed and be falsy in your applications. Be sure to know what you're doing before removing a project."
                }
              />
            </Section>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
