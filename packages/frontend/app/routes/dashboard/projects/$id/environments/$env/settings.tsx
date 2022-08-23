import { BreadCrumbs } from "~/components/Breadcrumbs";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { Typography } from "~/components/Typography";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { Environment } from "~/modules/environments/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project, UserProject, UserRoles } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { HideMobile } from "~/components/HideMobile";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { EnvNavBar } from "~/modules/environments/components/EnvNavbar";
import { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card, CardContent } from "~/components/Card";
import { Stack } from "~/components/Stack";
import { Heading } from "~/components/Heading";
import { AiOutlineSetting } from "react-icons/ai";
import { TagLine } from "~/components/Tagline";
import { FiLayers } from "react-icons/fi";
import { Spacer } from "~/components/Spacer";

interface MetaArgs {
  data?: {
    project?: Project;
    environment?: Environment;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const projectName = data?.project?.name || "An error ocurred";
  const envName = data?.environment?.name || "An error ocurred";

  return {
    title: `Progressively | ${projectName} | ${envName} | Settings`,
  };
};

interface LoaderData {
  project: Project;
  environment: Environment;
  userRole?: UserRoles;
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

  const environment = project.environments.find(
    (env) => env.uuid === params.env
  );

  const userProject: UserProject | undefined = project.userProject?.find(
    (userProject) => userProject.userId === user.uuid
  );

  return {
    project,
    environment: environment!,
    userRole: userProject?.role,
    user,
  };
};

export default function EnvSettingsPage() {
  const { project, environment, userRole, user } = useLoaderData<LoaderData>();

  const crumbs: Crumbs = [
    {
      link: `/dashboard/projects/${project.uuid}`,
      label: project.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags`,
      label: environment.name,
      forceNotCurrent: true,
    },
  ];

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          title={environment.name}
          tagline={<TagLine icon={<FiLayers />}>ENVIRONMENT</TagLine>}
        />
      }
      subNav={<EnvNavBar projectId={project.uuid} envId={environment.uuid} />}
    >
      <Stack spacing={8}>
        <Heading as={"h2"} fontSize="earth" icon={<AiOutlineSetting />}>
          Settings
        </Heading>

        <Card>
          <CardContent>
            <Section id="general">
              <SectionHeader title="General" />
              <Typography>
                The following is the client key to use inside your application
                to retrieve the flags
              </Typography>
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
                    <Typography>
                      You can delete an environment at any time, but you{" "}
                      {`won’t`} be able to access its flags will be removed and
                      be falsy in your applications. Be sure to know what{" "}
                      {`you're`} doing before removing an environment.
                    </Typography>
                  }
                />

                <div>
                  <DeleteButton
                    to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/delete`}
                  >
                    <span>
                      <span aria-hidden>
                        Delete{" "}
                        <HideMobile>
                          {`"${environment.name}"`} forever
                        </HideMobile>
                      </span>

                      <VisuallyHidden>
                        Delete {`"${environment.name}"`} forever
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
