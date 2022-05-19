import { Stack } from "@chakra-ui/react";
import {
  useLoaderData,
  LoaderFunction,
  MetaFunction,
  ActionFunction,
  useSearchParams,
  useTransition,
} from "remix";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Environment } from "~/modules/environments/types";
import { activateFlag } from "~/modules/flags/services/activateFlag";
import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import { FlagEnv, FlagStatus } from "~/modules/flags/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { getSession } from "~/sessions";
import { FlagCard } from "~/modules/flags/components/FlagCard";
import { IoIosCreate } from "react-icons/io";
import { SuccessBox } from "~/components/SuccessBox";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { User } from "~/modules/user/types";
import { AiOutlineSetting } from "react-icons/ai";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { EmptyState } from "~/components/EmptyState";
import { FiFlag, FiKey } from "react-icons/fi";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Button } from "~/components/Button";
import { Typography } from "~/components/Typography";

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

  const transition = useTransition();
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
          title={environment.name}
          startAction={
            <ButtonCopy
              toCopy={environment.clientKey}
              icon={<FiKey aria-hidden />}
            >
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
    >
      <Section id="list-flags-title">
        <Stack spacing={2}>
          {isFlagRemoved ? (
            <SuccessBox id="flag-removed" mb={4}>
              The flag has been successfully deleted.
            </SuccessBox>
          ) : null}

          {newFlagId ? (
            <SuccessBox id="flag-added" mb={4}>
              The flag has been successfully created.
            </SuccessBox>
          ) : null}
        </Stack>

        <SectionHeader
          title="Feature flags"
          hiddenTitle
          endAction={
            flagsByEnv.length > 0 && (
              <Button
                to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/create`}
                leftIcon={<IoIosCreate aria-hidden />}
                colorScheme="brand"
                flexShrink={0}
              >
                Create a feature flag
              </Button>
            )
          }
        />

        {flagsByEnv.length > 0 ? (
          <>
            {flagsByEnv.map((flagEnv, index) => (
              <FlagCard
                noBorder={index === 0}
                key={flagEnv.flagId}
                id={flagEnv.flagId}
                linkTo={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${flagEnv.flagId}`}
                title={flagEnv.flag.name}
                flagStatus={flagEnv.status}
                flagKey={flagEnv.flag.key}
                description={flagEnv.flag.description}
                optimistic={
                  transition.state === "submitting" &&
                  transition.submission?.formData.get("flagId") ===
                    flagEnv.flagId
                }
              />
            ))}
          </>
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
              <Button
                to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/create`}
                leftIcon={<IoIosCreate aria-hidden />}
                colorScheme="brand"
                flexShrink={0}
              >
                Create a feature flag
              </Button>
            }
          />
        ) : null}
      </Section>
    </DashboardLayout>
  );
}
