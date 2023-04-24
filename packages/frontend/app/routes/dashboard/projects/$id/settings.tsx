import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Section, SectionHeader } from "~/components/Section";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { removeMember } from "~/modules/projects/services/removeMember";
import { UserRoles } from "~/modules/projects/types";
import { UserTable } from "~/modules/user/components/UserTable";
import { getSession } from "~/sessions";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Spacer } from "~/components/Spacer";
import { MetaFunction, ActionFunction } from "@remix-run/node";
import { useActionData, useTransition, Form } from "@remix-run/react";
import { Card, CardContent } from "~/components/Card";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";

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

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | null> => {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();

  const promiseOfMembersToRemove: Array<Promise<{ statusCode: number }>> = [];

  for (const d of formData.values()) {
    if (d !== "delete-member" && d !== "select-all") {
      promiseOfMembersToRemove.push(
        removeMember(params.id!, d.toString(), session.get("auth-cookie"))
      );
    }
  }

  const result = await Promise.all(promiseOfMembersToRemove);
  const successful = result.filter((res) => res?.statusCode !== 401);

  return {
    errors: {
      unauthorized:
        successful.length === result.length
          ? undefined
          : "You have attempted to remove an admin user! No worries, we got your back!",
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

  return (
    <DashboardLayout
      user={user}
      subNav={<ProjectNavBar projectId={project.uuid} />}
    >
      <PageTitle value="Settings" />

      <Card>
        <Section id="members">
          <Form method="post">
            <CardContent>
              <SectionHeader
                title="Project members"
                action={
                  userRole === UserRoles.Admin && (
                    <div className="flex flex-col md:flex-row gap-3">
                      <CreateButton
                        variant="secondary"
                        to={`/dashboard/projects/${project.uuid}/add-member`}
                      >
                        Add member
                      </CreateButton>

                      <DeleteButton
                        variant="secondary"
                        type={"submit"}
                        isLoading={transition.state === "submitting"}
                        loadingText="Deleting the member(s), please wait..."
                      >
                        Remove from project
                      </DeleteButton>
                    </div>
                  )
                }
              />

              {data?.errors.unauthorized && (
                <>
                  <Spacer size={4} />
                  <ErrorBox list={data.errors} />
                </>
              )}

              {data?.success && (
                <>
                  <Spacer size={4} />
                  <SuccessBox id="member-deleted">
                    {data?.removedCount} user have been successfully removed
                    from the project.
                  </SuccessBox>
                </>
              )}
            </CardContent>

            <UserTable
              userProjects={project.userProject || []}
              canEdit={userRole === UserRoles.Admin}
            />
          </Form>
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
