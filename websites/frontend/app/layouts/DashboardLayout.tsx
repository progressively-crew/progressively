import { Main } from "~/components/Main";
import { SkipNavLink } from "~/components/SkipNav";
import { Spacer } from "~/components/Spacer";
import { Inert } from "~/components/Inert/Inert";
import { Form, useMatches, useNavigation } from "@remix-run/react";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { Spinner } from "~/components/Spinner";
import { UserNav } from "~/modules/user/components/UserNav";
import { Typography } from "~/components/Typography";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { IconBox } from "~/components/IconBox";
import { ProjectIcon } from "~/components/Icons/ProjectIcon";
import { ToggleFlag } from "~/modules/flags/components/ToggleFlag";
import { FlagStatus } from "~/modules/flags/types";
import { useProject } from "~/modules/projects/contexts/useProject";
import { ButtonCopy } from "~/components/ButtonCopy";
import { useFlag } from "~/modules/flags/contexts/useFlag";

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
  const { flag } = useFlag();
  const { project } = useProject();

  const crumbs = matches
    .filter((match) => match.handle && match.handle.breadcrumb)
    .map((match) => match.handle.breadcrumb(match, matches));

  const isNormalLoad =
    navigation.state === "loading" && navigation.formData == null;

  const layoutClassName = "max-w-screen-xl mx-auto";

  const lastCrumb = crumbs.at(-1);
  const hasMoreThanOneCrumb = crumbs.length > 1;

  const isActivated = flag?.status === FlagStatus.ACTIVATED;

  return (
    <Inert>
      <SkipNavLink>Skip to content</SkipNavLink>

      <div className="bg-gray-50 h-full flex-1">
        {lastCrumb && (
          <div
            className={`bg-white border-b border-gray-200 rounded-t-lg pt-1 ${
              hasMoreThanOneCrumb ? "pt-1" : "py-1"
            }`}
          >
            <div
              className={`flex flex-row items-center px-1 ${
                hasMoreThanOneCrumb || backLink
                  ? "justify-between"
                  : "justify-end"
              }`}
            >
              {hasMoreThanOneCrumb ? (
                <BreadCrumbs crumbs={crumbs} />
              ) : (
                <nav>{backLink}</nav>
              )}
              <UserNav />
            </div>

            {!lastCrumb.isRoot && (
              <header
                className={`px-4 pb-4 ${crumbs.length > 0 ? "pt-4" : ""}`}
              >
                <div className="flex flex-row gap-2 items-center">
                  <IconBox content={lastCrumb.label} size="L">
                    {lastCrumb.isFlag && <FlagIcon />}
                    {lastCrumb.isProject && <ProjectIcon />}
                  </IconBox>

                  <Typography
                    as="span"
                    className="text-xl font-extrabold font-title"
                  >
                    {lastCrumb.label}
                  </Typography>
                </div>

                {flag?.uuid && project && (
                  <div className="flex flex-row gap-4 items-center pt-2">
                    <ButtonCopy toCopy={flag.key} size="S">
                      {flag.key}
                    </ButtonCopy>

                    <Form method="post" id={`form-${flag.uuid}`}>
                      <ToggleFlag
                        isFlagActivated={isActivated}
                        flagId={flag.uuid}
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
          className={`${layoutClassName} h-full flex-1 px-4 md:px-20 pt-8 md:pt-0 w-full`}
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
