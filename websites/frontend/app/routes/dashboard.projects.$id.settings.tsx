import { Section, SectionHeader } from "~/components/Section";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { UserRoles } from "~/modules/projects/types";
import { UserTable } from "~/modules/user/components/UserTable";
import { ActionFunction, MetaFunction } from "@remix-run/node";
import { Card, CardContent } from "~/components/Card";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { Typography } from "~/components/Typography";
import { Outlet, useActionData, useSearchParams } from "@remix-run/react";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { getSession } from "~/sessions";
import { rotateSecretKey } from "~/modules/projects/services/rotateSecretKey";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Dd, Dl, Dt } from "~/components/Dl";
import { Spacer } from "~/components/Spacer";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Settings`,
    },
  ];
};

interface ActionDataType {
  success: boolean;
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionDataType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const formData = await request.formData();
  const projectId = formData.get("projectId")?.toString();

  try {
    await rotateSecretKey(projectId!, authCookie);
    return { success: true };
  } catch {
    return { success: false };
  }
};

export default function SettingsPage() {
  const { project, userRole } = useProject();
  const [searchParams] = useSearchParams();
  const actionData = useActionData<ActionDataType>();
  const isMemberRemoved = searchParams.get("memberRemoved") || undefined;

  const actionResult =
    actionData?.success === true ? (
      <SuccessBox id="secret-key-rotated">
        The secret key has been rotated.
      </SuccessBox>
    ) : actionData?.success === false ? (
      <ErrorBox
        list={{
          error: "A problem occured when trying to rotate the secret key.",
        }}
      ></ErrorBox>
    ) : null;

  return (
    <>
      <DashboardLayout
        subNav={<ProjectNavBar project={project} />}
        status={
          actionResult ??
          (isMemberRemoved ? (
            <SuccessBox id={"plan-add-success"}>
              The member has been successfully removed.
            </SuccessBox>
          ) : null)
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
          <CardContent>
            <Section id="general">
              <SectionHeader
                title="General"
                description={
                  "The following is the project keys to use inside your application to get the flag variation"
                }
              />

              <Spacer size={4} />
              <Dl>
                <Dt>Client key</Dt>
                <Dd>
                  <ButtonCopy toCopy={project.clientKey} size="S">
                    {project.clientKey}
                  </ButtonCopy>
                </Dd>

                <Dt>Secret key</Dt>
                <Dd>
                  <ButtonCopy
                    size="S"
                    toCopy={project.secretKey}
                    toCopyAlternative="**********"
                  >
                    **********
                  </ButtonCopy>
                </Dd>
              </Dl>
            </Section>
          </CardContent>
        </Card>

        <Card>
          <Section id="members">
            <CardContent>
              <SectionHeader
                title="Project members"
                action={
                  userRole === UserRoles.Admin && (
                    <CreateButton
                      variant="secondary"
                      to={`/dashboard/projects/${project.uuid}/settings/add-member`}
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
              <DeleteButton
                to={`/dashboard/projects/${project.uuid}/settings/delete`}
              >
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
                    "You can delete a project at any time. Its related flags will be removed and be falsy in your applications. Be sure to know what you're doing before removing a project."
                  }
                />
              </Section>
            </CardContent>
          </Card>
        )}
      </DashboardLayout>
      <Outlet />
    </>
  );
}
