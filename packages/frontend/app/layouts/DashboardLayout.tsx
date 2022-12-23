import { Main } from "~/components/Main";
import { User } from "~/modules/user/types";
import { SkipNavLink } from "~/components/SkipNav";
import { Container } from "~/components/Container";
import { Spacer } from "~/components/Spacer";
import { NavProvider } from "~/components/Breadcrumbs/providers/NavProvider";
import { InertWhenNavOpened } from "~/components/Breadcrumbs/InertWhenNavOpened";
import { UseDropdown } from "~/modules/user/components/UserDropdown";
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

      <div className="dark:bg-slate-900 z-10 lg:sticky top-0">
        <Container>
          <div className="flex justify-between h-14 items-center">
            <BreadCrumbs crumbs={crumbs} />

            <UseDropdown user={user} />
          </div>
        </Container>
      </div>

      <InertWhenNavOpened className="h-full">
        {subNav && <HideDesktop>{subNav}</HideDesktop>}

        <div className="px-4 md:px-12 lg:px-0 h-full">
          <div>
            <div className={`overflow-hidden max-w-7xl w-full mx-auto`}>
              {header && <Spacer size={12} />}
              {header}
              {header && <Spacer size={4} />}

              {subNav && (
                <>
                  <HideTablet as="div">
                    <div className="lg:h-full">{subNav}</div>
                  </HideTablet>
                </>
              )}

              <Spacer size={8} />

              <Main>
                <div className="flex flex-col gap-2 md:gap-6">
                  {status}

                  {children}
                </div>
              </Main>

              <Spacer size={10} />
            </div>
          </div>
        </div>
      </InertWhenNavOpened>
    </NavProvider>
  );
};
