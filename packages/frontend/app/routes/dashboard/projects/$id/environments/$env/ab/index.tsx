import { BreadCrumbs } from "~/components/Breadcrumbs";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Environment } from "~/modules/environments/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { getSession } from "~/sessions";
import { SuccessBox } from "~/components/SuccessBox";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { User } from "~/modules/user/types";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { EmptyState } from "~/components/EmptyState";
import { Typography } from "~/components/Typography";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { HideMobile } from "~/components/HideMobile";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { EnvNavBar } from "~/modules/environments/components/EnvNavbar";
import { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { Experiment } from "~/modules/ab/types";
import { getExperimentsByEnv } from "~/modules/ab/services/getExperimentsByEnv";
import { Spacer } from "~/components/Spacer";
import { ExperimentRow } from "~/modules/ab/components/ExperimentRow";
import { VisuallyHidden } from "~/components/VisuallyHidden";

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
    title: `Progressively | ${projectName} | ${envName} | A/B experiments`,
  };
};

interface LoaderData {
  project: Project;
  experiments: Array<Experiment>;
  environment: Environment;
  user: User;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const project: Project = await getProject(params.id!, authCookie);

  const experiments: Array<Experiment> = await getExperimentsByEnv(
    params.env!,
    authCookie
  );

  const environment = project.environments.find(
    (env) => env.uuid === params.env
  );

  return { experiments, project, environment: environment!, user };
};

export default function AbPage() {
  const { experiments, project, environment, user } =
    useLoaderData<LoaderData>();

  const [searchParams] = useSearchParams();
  const newExperimentId = searchParams.get("newExperimentId") || undefined;
  const isExperimentRemoved =
    searchParams.get("experimentRemoved") || undefined;

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
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags`,
      label: environment.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags`,
      label: "A/B experiments",
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
              A/B experiments
              <VisuallyHidden> of {environment.name}</VisuallyHidden>
            </span>
          }
          startAction={
            <HideMobile>
              <ButtonCopy toCopy={environment.clientKey}>
                {environment.clientKey}
              </ButtonCopy>
            </HideMobile>
          }
        />
      }
      subNav={<EnvNavBar projectId={project.uuid} envId={environment.uuid} />}
      status={
        isExperimentRemoved ? (
          <SuccessBox id="experiment-removed">
            The A/B experiment has been successfully deleted.
          </SuccessBox>
        ) : newExperimentId ? (
          <SuccessBox id="experiment-added">
            The A/B experiment has been successfully created.
          </SuccessBox>
        ) : null
      }
    >
      <Section id="list-abs-title">
        <SectionHeader title="A/B experiments" hiddenTitle />

        {experiments.length > 0 ? (
          <div>
            <CreateButton
              to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/ab/create`}
            >
              Create an experiment
            </CreateButton>

            <Spacer size={4} />

            {experiments.map((exp) => (
              <ExperimentRow
                id={exp.uuid}
                key={exp.uuid}
                experimentKey={exp.key}
                title={exp.name}
                description={exp.description}
                linkTo={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/ab/${exp.uuid}/variants`}
              />
            ))}
          </div>
        ) : null}

        {experiments.length === 0 && (
          <EmptyState
            title="No A/B experiments found"
            description={
              <Typography>
                There are no A/B experiments yet on this environment.
              </Typography>
            }
            action={
              <CreateButton
                to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/ab/create`}
              >
                Create an A/B experiment
              </CreateButton>
            }
          />
        )}
      </Section>
    </DashboardLayout>
  );
}
