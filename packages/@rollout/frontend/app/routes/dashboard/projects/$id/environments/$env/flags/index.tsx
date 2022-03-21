import { Box, Button, Stack, Text } from "@chakra-ui/react";
import {
  useLoaderData,
  LoaderFunction,
  MetaFunction,
  ActionFunction,
  Link,
  useSearchParams,
  useTransition,
} from "remix";
import { Link as CLink } from "@chakra-ui/react";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Main } from "~/components/Main";
import { Environment } from "~/modules/environments/types";
import { activateFlag } from "~/modules/flags/activateFlag";
import { getFlagsByProjectEnv } from "~/modules/flags/getFlagsByProjectEnv";
import { FlagEnv, FlagStatus } from "~/modules/flags/types";
import { getProject } from "~/modules/projects/getProject";
import { Project } from "~/modules/projects/types";
import { getSession } from "~/sessions";
import { FlagCard } from "~/modules/flags/FlagCard";
import { IoIosCreate } from "react-icons/io";
import { SuccessBox } from "~/components/SuccessBox";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/auth-guard";
import { User } from "~/modules/user/types";
import { AiOutlineSetting, AiOutlineKey } from "react-icons/ai";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { EmptyState } from "~/components/EmptyState";
import { FiFlag } from "react-icons/fi";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";

interface MetaArgs {
  data: {
    project: Project;
    environment: Environment;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const project = data.project;
  const environment = data.environment;

  return {
    title: `Rollout | ${project.name} | ${environment.name} | Flags`,
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
      params.id!,
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
    params.id!,
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
    <DashboardLayout user={user}>
      <BreadCrumbs crumbs={crumbs} />

      <Main>
        <Box pb={8}>
          <Header
            title={environment.name}
            startAction={
              <ButtonCopy
                toCopy={environment.clientKey}
                icon={<AiOutlineKey aria-hidden />}
                colorScheme="brand"
              >
                {environment.clientKey}
              </ButtonCopy>
            }
          />
        </Box>

        <Box pb={6}>
          <HorizontalNav label={`Environment related navigation`}>
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
        </Box>

        <Section as="section" id="list-flags-title">
          <SectionHeader
            title="Feature flags"
            description={
              <Text>
                To setup your feature flags in your app, make sure to follow{" "}
                <CLink
                  textDecoration={"underline"}
                  as={Link}
                  to={`/guides/sdks/react/ssr?sdk-key=${environment.clientKey}`}
                >
                  this guide
                </CLink>
                .
              </Text>
            }
            endAction={
              <Button
                as={Link}
                to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/create`}
                leftIcon={<IoIosCreate aria-hidden />}
                colorScheme="brand"
                flexShrink={0}
              >
                Create a feature flag
              </Button>
            }
          />

          <Stack spacing={2}>
            {isFlagRemoved ? (
              <SuccessBox id="flag-removed">
                The flag has been successfully deleted.
              </SuccessBox>
            ) : null}

            {flagsByEnv.length > 0 ? (
              <>
                {newFlagId ? (
                  <SuccessBox id="flag-added">
                    The flag has been successfully created.
                  </SuccessBox>
                ) : null}

                <Box>
                  {flagsByEnv.map((flagEnv) => (
                    <FlagCard
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
                </Box>
              </>
            ) : null}

            {flagsByEnv.length === 0 ? (
              <EmptyState
                title="No flags found"
                description={
                  <Text>There are no flags yet on this environment.</Text>
                }
              />
            ) : null}
          </Stack>
        </Section>
      </Main>
    </DashboardLayout>
  );
}
