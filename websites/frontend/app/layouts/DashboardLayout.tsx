import { Main } from "~/components/Main";
import { SkipNavLink } from "~/components/SkipNav";
import { Spacer } from "~/components/Spacer";
import { Inert } from "~/components/Inert/Inert";
import { Form, Link, useMatches, useNavigation } from "@remix-run/react";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { Spinner } from "~/components/Spinner";
import { UserNav } from "~/modules/user/components/UserNav";
import { Typography } from "~/components/Typography";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { IconBox } from "~/components/IconBox";
import { ProjectIcon } from "~/components/Icons/ProjectIcon";
import { EnvIcon } from "~/components/Icons/EnvIcon";
import { ToggleFlag } from "~/modules/flags/components/ToggleFlag";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { FlagStatus } from "~/modules/flags/types";
import { useProject } from "~/modules/projects/contexts/useProject";
import { EnvMenuButton } from "~/modules/environments/components/EnvMenuButton";
import { SettingsIcon } from "~/components/Icons/SettingsIcon";
import { IconButton } from "~/components/Buttons/IconButton";
import { ButtonCopy } from "~/components/ButtonCopy";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  subNav?: React.ReactNode;
  status?: React.ReactNode;
  backLink?: React.ReactNode;
}

export const DashboardLayout = ({
  children,
  subNav,
  status,
  backLink,
}: DashboardLayoutProps) => {
  const navigation = useNavigation();
  const matches = useMatches();
  const { flagEnv } = useFlagEnv();
  const { project } = useProject();

  const crumbs = matches
    .filter((match) => match.handle && match.handle.breadcrumb)
    .map((match) => match.handle.breadcrumb(match, matches));

  const isNormalLoad =
    navigation.state === "loading" && navigation.formData == null;

  const layoutClassName = "max-w-7xl mx-auto";

  const lastCrumb = crumbs.at(-1);
  const hasMoreThanOneCrumb = crumbs.length > 1;

  const isActivated = flagEnv?.status === FlagStatus.ACTIVATED;

  return (
    <Inert>
      <SkipNavLink>Skip to content</SkipNavLink>

      <div className="bg-gray-50 dark:bg-slate-900 h-full flex-1 rounded-xl shadow-xl">
        {lastCrumb && (
          <div
            className={`bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 rounded-t-lg pt-1 px-1 ${
              hasMoreThanOneCrumb ? "pt-1" : "py-1"
            }`}
          >
            <div
              className={`flex flex-row items-center ${
                hasMoreThanOneCrumb || backLink
                  ? "justify-between"
                  : "justify-end"
              }`}
            >
              {hasMoreThanOneCrumb ? <BreadCrumbs crumbs={crumbs} /> : backLink}
              <UserNav />
            </div>

            {!lastCrumb.isRoot && (
              <header
                className={`px-4 pb-4 ${crumbs.length > 0 ? "pt-6" : ""}`}
              >
                <div className="flex flex-row gap-2 items-center">
                  <IconBox content={lastCrumb.label} size="L">
                    {lastCrumb.isFlag && <FlagIcon />}
                    {lastCrumb.isProject && <ProjectIcon />}
                    {lastCrumb.isEnv && <EnvIcon />}
                  </IconBox>

                  <Typography
                    as="span"
                    className="text-3xl font-extrabold font-title"
                  >
                    {lastCrumb.label}
                  </Typography>

                  {project && flagEnv && (
                    <IconButton
                      icon={<SettingsIcon />}
                      tooltip={"Settings"}
                      as={Link}
                      to={`/dashboard/projects/${project.uuid}/flags/${flagEnv.flagId}`}
                    />
                  )}

                  {project && !flagEnv && (
                    <IconButton
                      icon={<SettingsIcon />}
                      tooltip={"Settings"}
                      as={Link}
                      to={`/dashboard/projects/${project.uuid}/settings`}
                    />
                  )}
                </div>

                {flagEnv && project && (
                  <div className="flex flex-row gap-4 items-center pt-2 -mx-3">
                    <EnvMenuButton
                      projectId={project.uuid}
                      flagId={flagEnv.flagId}
                      environments={project.environments}
                    />

                    <ButtonCopy toCopy={flagEnv.flag.key} size="S">
                      {flagEnv.flag.key}
                    </ButtonCopy>

                    <Form method="post" id={`form-${flagEnv.flagId}`}>
                      <ToggleFlag
                        isFlagActivated={isActivated}
                        flagId={flagEnv.flagId}
                      />
                    </Form>
                  </div>
                )}
              </header>
            )}

            {subNav}
          </div>
        )}

        <div
          className={`${layoutClassName} h-full dark:bg-slate-900 flex-1 px-4 md:px-20 pt-8 md:pt-0 w-full`}
        >
          <Main>
            {status}
            <div className="flex-1">
              <div>
                <div className="md:h-12" />

                <div className="flex flex-col gap-4 md:gap-6">{children}</div>

                <Spacer size={10} />
              </div>

              {isNormalLoad && (
                <div
                  className="fixed left-4 bottom-4 animate-opacity-appearing"
                  style={{
                    animationDelay: "300ms",
                    opacity: 0,
                  }}
                >
                  <Spinner className="text-3xl text-gray-400" />
                </div>
              )}
            </div>
          </Main>
        </div>
      </div>
    </Inert>
  );
};
