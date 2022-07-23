import { BreadCrumbs } from "~/components/Breadcrumbs";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { Environment } from "~/modules/environments/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project, UserProject, UserRoles } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import {
  CardSection,
  SectionContent,
  SectionHeader,
} from "~/components/Section";
import { AiOutlineExperiment } from "react-icons/ai";
import { Typography } from "~/components/Typography";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { HideMobile } from "~/components/HideMobile";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Experiment, ExperimentStatus } from "~/modules/ab/types";
import { getExperimentById } from "~/modules/ab/services/getExperimentById";
import { AbNavBar } from "~/modules/ab/components/AbNavBar";
import { ExperimentHeaderAction } from "~/modules/ab/components/ExperimentHeaderAction";

interface MetaArgs {
  data?: {
    project?: Project;
    environment?: Environment;
    experimentEnv?: Experiment;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const projectName = data?.project?.name || "An error ocurred";
  const envName = data?.environment?.name || "An error ocurred";
  const experimentName =
    data?.experimentEnv?.experiment?.name || "An error ocurred";

  return {
    title: `Progressively | ${projectName} | ${envName} | ${experimentName} | Settings`,
  };
};

interface LoaderData {
  project: Project;
  environment: Environment;
  experimentEnv: Experiment;
  user: User;
  userRole?: UserRoles;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);

  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const project: Project = await getProject(params.id!, authCookie, true);

  const environment = project.environments.find(
    (env) => env.uuid === params.env
  );

  const experimentEnv = await getExperimentById(
    params.env!,
    params.experimentId!,
    authCookie
  );

  const userProject: UserProject | undefined = project.userProject?.find(
    (userProject) => userProject.userId === user.uuid
  );

  return {
    project,
    environment: environment!,
    experimentEnv,
    user,
    userRole: userProject?.role,
  };
};

export default function ExperimentSettingsPage() {
  const { project, environment, experimentEnv, user, userRole } =
    useLoaderData<LoaderData>();

  const { status, experiment } = experimentEnv;
  const isExperimentActivated = status === ExperimentStatus.ACTIVATED;

  const crumbs: Crumbs = [
    {
      link: "/dashboard",
      label: "Projects",
    },
    {
      link: `/dashboard/projects/${project.uuid}`,
      label: project.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/ab`,
      label: environment.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/ab/${experiment.uuid}`,
      label: experiment.name,
      icon: <AiOutlineExperiment aria-hidden />,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/ab/${experiment.uuid}/settings`,
      label: "Settings",
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
              Settings
              <VisuallyHidden> of {experiment.name}</VisuallyHidden>
            </span>
          }
          startAction={
            <ExperimentHeaderAction
              experimentKey={experiment.key}
              isExperimentActivated={isExperimentActivated}
            />
          }
        />
      }
      subNav={
        <AbNavBar
          projectId={project.uuid}
          envId={environment.uuid}
          experimentId={experiment.uuid}
        />
      }
    >
      {userRole === UserRoles.Admin && (
        <CardSection id="danger">
          <SectionHeader
            title="Danger zone"
            description={
              <Typography>
                You can delete an A/B experiment at any time, but you {`won’t`}{" "}
                be able to access its insights anymore and false will be served
                to the application using it.
              </Typography>
            }
          />

          <SectionContent>
            <DeleteButton
              to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/ab/${experiment.uuid}/delete`}
            >
              <span>
                <span aria-hidden>
                  Delete <HideMobile>{experiment.name} forever</HideMobile>
                </span>

                <VisuallyHidden>
                  Delete {experiment.name} forever
                </VisuallyHidden>
              </span>
            </DeleteButton>
          </SectionContent>
        </CardSection>
      )}
    </DashboardLayout>
  );
}
