import {
  useLoaderData,
  LoaderFunction,
  MetaFunction,
  ActionFunction,
  useSearchParams,
} from "remix";
import { Crumbs, BreadCrumbs } from "~/components/Breadcrumbs";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Environment } from "~/modules/environments/types";
import { activateFlag } from "~/modules/flags/services/activateFlag";
import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import { FlagEnv, FlagStatus } from "~/modules/flags/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { getSession } from "~/sessions";
import { SuccessBox } from "~/components/SuccessBox";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { User } from "~/modules/user/types";
import { AiOutlineSetting } from "react-icons/ai";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { EmptyState } from "~/components/EmptyState";
import { FiFlag } from "react-icons/fi";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Typography } from "~/components/Typography";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { FlagList } from "~/modules/flags/components/FlagList";
import { Spacer } from "~/components/Spacer";
import { styled } from "~/stitches.config";

const ToggleAction = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
});
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
    title: `Progressively | ${projectName} | ${envName} | Flags`,
  };
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<null> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const formData = await request.formData();
  const nextStatus = formData.get("nextStatus");
  const flagId = formData.get("flagId");

  if (nextStatus && flagId) {
    await activateFlag(
      params.env!,
      flagId as string,
      nextStatus as FlagStatus,
      authCookie
    );
  }

  return null;
};

interface LoaderData {
  project: Project;
  flagsByEnv: Array<FlagEnv>;
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

  const flagsByEnv: Array<FlagEnv> = await getFlagsByProjectEnv(
    params.env!,
    authCookie
  );

  const environment = project.environments.find(
    (env) => env.uuid === params.env
  );

  return { flagsByEnv, project, environment: environment!, user };
};

export default function FlagsByEnvPage() {
  const { flagsByEnv, project, environment, user } =
    useLoaderData<LoaderData>();

  const [searchParams] = useSearchParams();
  const newFlagId = searchParams.get("newFlagId") || undefined;
  const isFlagRemoved = searchParams.get("flagRemoved") || undefined;

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
  ];

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          tagline="Environment"
          title={environment.name}
          startAction={
            <ButtonCopy toCopy={environment.clientKey}>
              {environment.clientKey}
            </ButtonCopy>
          }
        />
      }
      subNav={
        <HorizontalNav label={`Environment related`}>
          <NavItem
            to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags`}
            icon={<FiFlag />}
          >
            Feature flags
          </NavItem>

          <NavItem
            to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/settings`}
            icon={<AiOutlineSetting />}
          >
            Settings
          </NavItem>
        </HorizontalNav>
      }
      status={
        isFlagRemoved ? (
          <SuccessBox id="flag-removed">
            The flag has been successfully deleted.
          </SuccessBox>
        ) : newFlagId ? (
          <SuccessBox id="flag-added">
            The flag has been successfully created.
          </SuccessBox>
        ) : null
      }
    >
      <Section id="list-flags-title">
        <SectionHeader title="Feature flags" hiddenTitle />

        {flagsByEnv.length > 0 ? (
          <div>
            <CreateButton
              to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/create`}
            >
              Create a feature flag
            </CreateButton>

            <Spacer size={4} />

            <FlagList
              flags={flagsByEnv}
              envId={environment.uuid}
              projectId={project.uuid}
            />
          </div>
        ) : null}

        {flagsByEnv.length === 0 ? (
          <EmptyState
            title="No flags found"
            description={
              <Typography>
                There are no flags yet on this environment.
              </Typography>
            }
            action={
              <CreateButton
                to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/create`}
              >
                Create a feature flag
              </CreateButton>
            }
          />
        ) : null}
      </Section>
    </DashboardLayout>
  );
}
