import { AiOutlineSetting } from "react-icons/ai";
import { FiLayers } from "react-icons/fi";
import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { ErrorBox } from "~/components/ErrorBox";
import { Header } from "~/components/Header";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import {
  CardSection,
  SectionContent,
  SectionHeader,
} from "~/components/Section";
import { SuccessBox } from "~/components/SuccessBox";
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
import { Divider } from "~/components/Divider";
import { Stack } from "~/components/Stack";
import { DeleteButton } from "~/components/Buttons/DeleteButton";

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
  const method = formData.get("_method");

  if (method === "delete-member") {
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
  }

  return null;
};

export default function SettingsPage() {
  const { project, userRole, user } = useLoaderData<LoaderData>();
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
          <NavItem
            to={`/dashboard/projects/${project.uuid}`}
            icon={<FiLayers />}
          >
            Environments
          </NavItem>

          <NavItem
            to={`/dashboard/projects/${project.uuid}/settings`}
            icon={<AiOutlineSetting />}
          >
            Settings
          </NavItem>
        </HorizontalNav>
      }
    >
      <Stack spacing={8}>
        <CardSection id="details">
          <SectionHeader
            title="Project details"
            description={<Typography>{project.name}</Typography>}
          />
        </CardSection>

        <CardSection id="members">
          <SectionHeader
            title="Project members"
            description={
              <Typography>
                Remember that users with the role <em>Admin</em> {`can't`} be
                removed.
              </Typography>
            }
          />

          <SectionContent>
            {data?.errors.unauthorized && <ErrorBox list={data.errors} />}
            {data?.success && (
              <SuccessBox id="member-deleted">
                {data?.removedCount} user have been successfully removed from
                the project.
              </SuccessBox>
            )}

            <UserTable
              projectId={project.uuid}
              userProjects={project.userProject || []}
              labelledBy="members"
              canEdit={userRole === UserRoles.Admin}
            />

            <Typography aria-live="polite">
              {transition.state === "submitting" ? "Removing the users..." : ""}
            </Typography>
          </SectionContent>
        </CardSection>

        {userRole === UserRoles.Admin && (
          <CardSection id="danger">
            <SectionHeader
              title="Danger zone"
              description={
                <Typography>
                  You can delete a project at any time, but you {`won’t`} be
                  able to access its environments and all the related flags will
                  be removed and be falsy in your applications. Be sure to know
                  what {`you're`} doing before removing a project.
                </Typography>
              }
            />

            <SectionContent>
              <DeleteButton to={`/dashboard/projects/${project.uuid}/delete`}>
                Delete <span>{`"${project.name}"`} forever</span>
              </DeleteButton>
            </SectionContent>
          </CardSection>
        )}
      </Stack>
    </DashboardLayout>
  );
}
