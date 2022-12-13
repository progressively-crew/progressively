import { Main } from "~/components/Main";
import { User } from "~/modules/user/types";
import { SkipNavLink } from "~/components/SkipNav";
import { Container } from "~/components/Container";
import { Spacer } from "~/components/Spacer";
import { NavProvider } from "~/components/Breadcrumbs/providers/NavProvider";
import { InertWhenNavOpened } from "~/components/Breadcrumbs/InertWhenNavOpened";
import { UseDropdown } from "~/modules/user/components/UserDropdown";
import { Stack } from "~/components/Stack";
import { useMatches } from "@remix-run/react";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { HideDesktop, HideTablet } from "~/components/HideMobile";

export interface DashboardLayoutProps {
  user?: Partial<User>;
  children: React.ReactNode;
  header?: React.ReactNode;
  subNav?: React.ReactNode;
  status?: React.ReactNode;
}

export const DashboardLayout = ({
  user,
  children,
  header,
  subNav,
  status,
}: DashboardLayoutProps) => {
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => match.handle && match.handle.breadcrumb)
    .map((match) => match.handle.breadcrumb(match, matches));

  return (
    <NavProvider>
      <SkipNavLink>Skip to content</SkipNavLink>

      <div className="border-b border-b-gray-100 dark:border-b-slate-700 bg-white dark:bg-slate-800 z-10 lg:sticky top-0">
        <Container>
          <div className="flex justify-between h-14 items-center ">
            <BreadCrumbs crumbs={crumbs} />

            <UseDropdown user={user} />
          </div>

          <HideDesktop>
            {header && <Spacer size={2} />}

            {header}
            {header && <Spacer size={2} />}
          </HideDesktop>
        </Container>
      </div>

      <InertWhenNavOpened className="h-full">
        {subNav && <HideDesktop>{subNav}</HideDesktop>}

        <div className="px-4 md:px-12 lg:px-0 h-full">
          <div
            className={
              subNav
                ? "grid grid-cols-[1fr] lg:grid-cols-[240px_1fr] gap-12 h-full"
                : "grid-cols-[1fr]"
            }
          >
            {subNav && (
              <HideTablet as="div">
                <div className="lg:h-full lg:fixed lg:w-[240px]">{subNav}</div>
              </HideTablet>
            )}

            <div
              className={`overflow-hidden max-w-7xl w-full mx-auto ${
                subNav ? "lg:pr-12" : ""
              }`}
            >
              <Spacer size={8} />
              <Main>
                <Stack spacing={6}>
                  {status}

                  {children}
                </Stack>
              </Main>

              <Spacer size={10} />
            </div>
          </div>
        </div>
      </InertWhenNavOpened>
    </NavProvider>
  );
};
