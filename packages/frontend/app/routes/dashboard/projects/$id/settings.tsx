import { AiOutlineSetting } from "react-icons/ai";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { Header } from "~/components/Header";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Section, SectionHeader } from "~/components/Section";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { removeMember } from "~/modules/projects/services/removeMember";
import { UserRoles } from "~/modules/projects/types";
import { UserTable } from "~/modules/user/components/UserTable";
import { getSession } from "~/sessions";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Stack } from "~/components/Stack";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Spacer } from "~/components/Spacer";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { HideMobile } from "~/components/HideMobile";
import { MetaFunction, ActionFunction } from "@remix-run/node";
import { useActionData, useTransition, Form } from "@remix-run/react";
import { Card, CardContent } from "~/components/Card";
import { TagLine } from "~/components/Tagline";
import { HStack } from "~/components/HStack";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { ProjectIcon } from "~/components/Icons/ProjectIcon";
import { EnvIcon } from "~/components/Icons/EnvIcon";

export const meta: MetaFunction = ({ parentsData }) => {
  const projectName = getProjectMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | Settings`,
  };
};

interface ActionData {
  errors: { unauthorized?: string };
  success?: boolean;
  removedCount?: number;
}

export const action: ActionFunction = async ({ request, params }): Promise<ActionData | null> => {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();

  const promiseOfMembersToRemove: Array<Promise<{ statusCode: number }>> = [];

  formData.forEach((d) => {
    if (d !== "delete-member" && d !== "select-all") {
      promiseOfMembersToRemove.push(
        removeMember(params.id!, d.toString(), session.get("auth-cookie"))
      );
    }
  });

  const result = await Promise.all(promiseOfMembersToRemove);
  const successful = result.filter((res) => res?.statusCode !== 401);

  return {
    errors: {
      unauthorized:
        successful.length !== result.length
          ? "You have attempted to remove an admin user! No worries, we got your back!"
          : undefined,
    },
    success: successful.length > 0,
    removedCount: successful.length,
  };
};

export default function SettingsPage() {
  const { user } = useUser();
  const { project, userRole } = useProject();
  const data = useActionData<ActionData>();
  const transition = useTransition();

  const crumbs: Crumbs = [
    {
      link: "/dashboard",
      label: "Projects",
    },
    {
      link: `/dashboard/projects/${project.uuid}`,
      label: project.name,
      forceNotCurrent: true,
    },
  ];

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          tagline={<TagLine icon={<ProjectIcon />}>PROJECT</TagLine>}
          title={
            <span>
              {project.name}
              <VisuallyHidden> settings</VisuallyHidden>
            </span>
          }
        />
      }
      subNav={
        <HorizontalNav label={`Project related`}>
          <NavItem to={`/dashboard/projects/${project.uuid}`} icon={<EnvIcon />}>
            Environments
          </NavItem>

          <NavItem to={`/dashboard/projects/${project.uuid}/settings`} icon={<AiOutlineSetting />}>
            Settings
          </NavItem>
        </HorizontalNav>
      }
    >
      <PageTitle value="Settings" icon={<AiOutlineSetting />} />

      <Stack spacing={8}>
        <Card>
          <Section id="members">
            <Form method="post">
              <CardContent noBottom>
                <SectionHeader title="Project members" titleAs="h3" />

                {data?.errors.unauthorized && (
                  <>
                    <ErrorBox list={data.errors} />
                    <Spacer size={4} />
                  </>
                )}

                {data?.success && (
                  <>
                    <SuccessBox id="member-deleted">
                      {data?.removedCount} user have been successfully removed from the project.
                    </SuccessBox>
                    <Spacer size={4} />
                  </>
                )}

                {userRole === UserRoles.Admin && (
                  <HStack spacing={4}>
                    <CreateButton small to={`/dashboard/projects/${project.uuid}/add-member`}>
                      Add member
                    </CreateButton>

                    <DeleteButton
                      small
                      type={"submit"}
                      isLoading={transition.state === "submitting"}
                      loadingText="Deleting the member(s), please wait..."
                    >
                      Remove from project
                    </DeleteButton>
                  </HStack>
                )}
              </CardContent>

              <UserTable
                userProjects={project.userProject || []}
                labelledBy="members"
                canEdit={userRole === UserRoles.Admin}
              />
            </Form>
          </Section>
        </Card>

        {userRole === UserRoles.Admin && (
          <Card>
            <CardContent>
              <Section id="danger">
                <SectionHeader
                  title="Danger zone"
                  titleAs="h3"
                  description={
                    <Typography>
                      You can delete a project at any time, but you {`won’t`} be able to access its
                      environments and all the related flags will be removed and be falsy in your
                      applications. Be sure to know what {`you're`} doing before removing a project.
                    </Typography>
                  }
                />

                <div>
                  <DeleteButton to={`/dashboard/projects/${project.uuid}/delete`}>
                    <span>
                      <span aria-hidden>
                        Delete <HideMobile>{`"${project.name}"`} forever</HideMobile>
                      </span>

                      <VisuallyHidden>Delete {`"${project.name}"`} forever</VisuallyHidden>
                    </span>
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
