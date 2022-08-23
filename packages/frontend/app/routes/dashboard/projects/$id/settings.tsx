import { AiOutlineSetting } from "react-icons/ai";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { getProject } from "~/modules/projects/services/getProject";
import { removeMember } from "~/modules/projects/services/removeMember";
import { Project, UserProject, UserRoles } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { UserTable } from "~/modules/user/components/UserTable";
import { getSession } from "~/sessions";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Stack } from "~/components/Stack";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Spacer } from "~/components/Spacer";
import { HideMobile } from "~/components/HideMobile";
import { MetaFunction, LoaderFunction, ActionFunction } from "@remix-run/node";
import {
  useLoaderData,
  useActionData,
  useTransition,
  Form,
} from "@remix-run/react";
import { Card, CardContent } from "~/components/Card";
import { Heading } from "~/components/Heading";
import { TagLine } from "~/components/Tagline";
import { MdOutlineGroupWork } from "react-icons/md";
import { HStack } from "~/components/HStack";
import { CreateButton } from "~/components/Buttons/CreateButton";

interface MetaArgs {
  data?: {
    project?: Project;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const title = data?.project?.name || "An error ocurred";

  return {
    title: `Progressively | ${title} | Settings`,
  };
};

interface LoaderData {
  project: Project;
  userRole: string | undefined;
  user: User;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);
  const session = await getSession(request.headers.get("Cookie"));
  const project: Project = await getProject(
    params.id!,
    session.get("auth-cookie"),
    true
  );

  const userProject: UserProject | undefined = project.userProject?.find(
    (userProject) => userProject.userId === user.uuid
  );

  return { project, userRole: userProject?.role, user };
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
  const { project, userRole, user } = useLoaderData<LoaderData>();
  const data = useActionData<ActionData>();
  const transition = useTransition();

  return (
    <DashboardLayout
      user={user}
      header={
        <Header
          tagline={<TagLine icon={<MdOutlineGroupWork />}>PROJECT</TagLine>}
          title={
            <span>
              {project.name}
              <VisuallyHidden> settings</VisuallyHidden>
            </span>
          }
        />
      }
    >
      <Stack spacing={8}>
        <Heading as={"h2"} fontSize="earth" icon={<AiOutlineSetting />}>
          Settings
        </Heading>

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
                      {data?.removedCount} user have been successfully removed
                      from the project.
                    </SuccessBox>
                    <Spacer size={4} />
                  </>
                )}

                {userRole === UserRoles.Admin && (
                  <HStack spacing={4}>
                    <CreateButton
                      to={`/dashboard/projects/${project.uuid}/add-member`}
                    >
                      Add member
                    </CreateButton>

                    <DeleteButton
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
                      You can delete a project at any time, but you {`won’t`} be
                      able to access its environments and all the related flags
                      will be removed and be falsy in your applications. Be sure
                      to know what {`you're`} doing before removing a project.
                    </Typography>
                  }
                />

                <div>
                  <DeleteButton
                    to={`/dashboard/projects/${project.uuid}/delete`}
                  >
                    <span>
                      <span aria-hidden>
                        Delete{" "}
                        <HideMobile>{`"${project.name}"`} forever</HideMobile>
                      </span>

                      <VisuallyHidden>
                        Delete {`"${project.name}"`} forever
                      </VisuallyHidden>
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
